import getDatabaseConnectionPool from "../utils/pool.postgres";
import { Recipe, Ingredient } from "./recipe";
import { v4 as uuidv4 } from "uuid";

const pool = getDatabaseConnectionPool();

export async function getAllRecipes(): Promise<Recipe[]> {
    const result = await pool.query(`
        SELECT r.id, r.title, r.minutes, r.servings, r.rating, r.price, r.created_at, i.name, ri.amount
        FROM recipes r
        LEFT JOIN recipe_ingredients ri ON ri.recipe_id = r.id
        LEFT JOIN ingredients i ON i.id = ri.ingredient_id ORDER BY r.id
    `);

    const recipesMap = new Map<number, Recipe>();

    for (const row of result.rows) {
        let recipe = recipesMap.get(row.id);

        if (!recipe) {
            recipe = {
                id: row.id,
                title: row.title,
                minutes: row.minutes,
                servings: row.servings,
                rating: row.rating,
                price: Number(row.price),
                ingredients: [],
            };

            recipesMap.set(row.id, recipe);
        }

        if (row.name) {
            recipe.ingredients?.push({
                name: row.name,
                amount: row.amount,
            });
        }
    }

    return [...recipesMap.values()];
}


export async function getRecipeById(id: number): Promise<Recipe | null> {
    const recipeRes = await pool.query(
        "SELECT * FROM recipes WHERE id = $1", [id]);

    const recipe = recipeRes.rows[0];
    if (!recipe)  return null;

    const ingredientsRes = await pool.query(
        `SELECT i.name, ri.amount
         FROM recipe_ingredients ri
         JOIN ingredients i ON i.id = ri.ingredient_id
         WHERE ri.recipe_id = $1`,
        [id]
    );

    return {
        ...recipe,
        ingredients: ingredientsRes.rows
    };
}

export async function createRecipe(data: Omit<Recipe, "id">): Promise<Recipe> {
    const result = await pool.query(
        `INSERT INTO recipes
         (title, minutes, servings, rating, price)
         VALUES ($1, $2, $3, $4, $5)s
         RETURNING *`,
        [ data.title, data.minutes, data.servings, data.rating, data.price ]
    );

    return result.rows[0];
}

export async function createIngredients(recipeId: number,ingredients: Ingredient[]): Promise<void> {
    for (const ingredient of ingredients) {
        const result = await pool.query(
            `INSERT INTO ingredients (name)
             VALUES ($1)
             RETURNING id`,
            [ ingredient.name ]
        );

        const ingredientId = result.rows[0].id;

        await pool.query(
            `INSERT INTO recipe_ingredients
             (recipe_id, ingredient_id, amount)
             VALUES ($1, $2, $3)`,
            [ recipeId, ingredientId, ingredient.amount ]
        );
    }
}

export async function addIngredient(recipeId: number, ingredientId: number, name: string, amount: string): Promise<void> {
    await pool.query(
        `INSERT INTO recipe_ingredients
         (recipe_id, ingredient_id, name, amount)
         VALUES ($1, $2, $3, $4)`,
        [ recipeId, ingredientId, name, amount ]
    );
}

export async function deleteRecipe(id: number): Promise<boolean> {
    const result = await pool.query(
        "DELETE FROM recipes WHERE id = $1",
        [id]
    );

    return result.rowCount === 1;
}
