import { Router } from "express";
import { getRecipesHandler, getRecipeHandler, createRecipeHandler, deleteRecipeHandler } from "./controller.ts";
import { requireApiKey } from "../middleware/auth.ts";

const router = Router();

router.get("/", getRecipesHandler);
router.post("/", createRecipeHandler);
router.get("/:id", getRecipeHandler);
router.delete("/:id", requireApiKey, deleteRecipeHandler);

export default router;