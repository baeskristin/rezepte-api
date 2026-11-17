import { mockRecipes, Recipe } from "./recipe";

let nextId = 5;

export async function getAllRecipes(maxMinutes?: number): Promise<Recipe[]> {
    if (maxMinutes !== undefined) return mockRecipes.filter((recipe) => recipe.minutes <= maxMinutes);
    return mockRecipes;
}

export async function getRecipeById(id: number): Promise<Recipe | null> {
    return mockRecipes.find((recipe) => recipe.id === id) ?? null;
}

export async function createRecipe(data: Omit<Recipe, "id">): Promise<Recipe> {
    const newRecipe: Recipe = { id: nextId++, ...data };
    mockRecipes.push(newRecipe);
    return newRecipe;
}

export async function deleteRecipe(id: number): Promise<boolean> {
    const index = mockRecipes.findIndex((recipe) => recipe.id === id);
    if (index === -1) return false;
    mockRecipes.splice(index, 1);
    return true;
}