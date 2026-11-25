import { Request, Response, NextFunction } from "express";
import { getAllRecipes, getRecipeById, createRecipe, addIngredient, deleteRecipe } from "./service.ts";

export async function getRecipesHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const recipes = await getAllRecipes();
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

export async function addIngredientHandler(req: Request, res: Response, next: NextFunction) {
    try {
        await addIngredient(Number(req.params.id), req.body.ingredientId, req.body.name, req.body.amount);
        res.status(201).json({
            message: "Ingredient added"
        });
    } catch (error) {
        next(error);
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