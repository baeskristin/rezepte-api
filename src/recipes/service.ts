import { Recipe } from "./recipe.ts";
import { RecipeNotFoundError, ValidationError } from "./error.ts";
import { getAllRecipes as getAllBooksRepo, 
        getRecipeById as getRecipeByIdRepo, 
        createRecipe as createRecipeRepo,
        createIngredients as createIngredientsRepo,
        addIngredient as addIngredientRepo,
        deleteRecipe as deleteRecipeRepo
    } from "./repo.ts";

export async function getAllRecipes(): Promise<Recipe[]> {
    return await getAllBooksRepo();
}

export async function getRecipeById(id: number): Promise<Recipe | null> {
    const recipe = getRecipeByIdRepo(id);
    if (!recipe) throw new RecipeNotFoundError(id);
    return recipe;
}

export async function createRecipe(data: Omit<Recipe, "id">): Promise<Recipe> {
    if (!data.title) throw new ValidationError("Ein Rezept braucht einen Titel");
     const recipe = await createRecipeRepo(data);

    if (data.ingredients?.length) {
        await createIngredientsRepo(recipe.id,data.ingredients);
    }

    return {...recipe, ingredients: data.ingredients ?? []};
}

export async function addIngredient(recipeId: number, ingredientId: number, name: string , amount: string): Promise<void> {
    await addIngredientRepo(recipeId, ingredientId, name, amount);
}

export async function deleteRecipe(id: number): Promise<boolean> {
    return await deleteRecipeRepo(id);
}