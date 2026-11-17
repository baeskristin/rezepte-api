import { Router } from "express";
import { getRecipesHandler, getRecipeHandler, createRecipeHandler, deleteRecipeHandler } from "./controller";

const router = Router();

router.get("/", getRecipesHandler);
router.post("/", createRecipeHandler);
router.get("/:id", getRecipeHandler);
router.delete("/:id", deleteRecipeHandler);

export default router;