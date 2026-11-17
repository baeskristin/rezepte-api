import { Router } from "express";
import { getRecipesHandler, getRecipeHandler } from "./controller";

const router = Router();

router.get("/", getRecipesHandler);
router.get("/:id", getRecipeHandler)

export default router;