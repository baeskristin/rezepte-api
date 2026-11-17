import { Request, Response, NextFunction } from "express";
import { getAllRecipes, getRecipeById, createRecipe, deleteRecipe } from "./service";

export async function getRecipesHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const maxMinutes = req.query.maxMinutes ? Number(req.query.maxMinutes) : undefined;
    const recipes = await getAllRecipes(maxMinutes);
    res.json(recipes);
  } catch (err) {
    next(err);
  }
}

export async function getRecipeHandler(req: Request, res: Response, next: NextFunction) {    
    try {
        const recipe = await getRecipeById(Number(req.params.id));
        if (!recipe) return res.status(404).json({ fehler: "Rezept nicht gefunden" });
        res.json(recipe);
    } catch (err) {
        next(err);
    }
}

export async function createRecipeHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const newRecipe = await createRecipe(req.body);
    res.status(201).json(newRecipe);
  } catch (err) {
    next(err);
  }
}

export async function deleteRecipeHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const deletedRecipe = await deleteRecipe(Number(req.params.id));
        if (!deletedRecipe) return res.status(404).json({ fehler: "Rezept nicht gefunden" });
        return res.status(204).send()
    } catch (err) {
        next(err);
    }
}