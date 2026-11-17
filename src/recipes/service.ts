import { mockRecipes, Recipe } from "./recipe";

export async function getAllRecipes(maxMinutes?: number) {
  if (maxMinutes !== undefined) return mockRecipes.filter((recipe) => recipe.minutes <= maxMinutes);
  return mockRecipes;
}

export async function getRecipeById(id: number): Promise<Recipe | null> {
    return mockRecipes.find((recipe) => recipe.id === id) ?? null;
}