import { Router } from "express";
import { getRecipesHandler, getRecipeHandler, createRecipeHandler, deleteRecipeHandler } from "./controller.ts";
import { requireApiKey } from "../middleware/auth.ts";

const router = Router();

/**
 * @swagger
 * /recipes:
 *   get:
 *     tags:
 *       - Recipes
 *     summary: GET all recipes
 *     responses:
 *       200:
 *         description: Returns a list of all recipes.
 */
router.get("/", getRecipesHandler);

/**
 * @swagger
 * /recipes:
 *   post:
 *     tags:
 *       - Recipes
 *     summary: CREATE a new recipe
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - minutes
 *               - servings
 *               - rating
 *               - price
 *             properties:
 *               title:
 *                 type: string
 *                 example: Spaghetti Carbonara
 *               minutes:
 *                 type: integer
 *                 example: 20
 *               servings:
 *                 type: integer
 *                 example: 2
 *               rating:
 *                 type: string
 *                 example: 4 Sterne
 *               price:
 *                 type: number
 *                 example: 1.5
 *     responses:
 *       201:
 *         description: Recipe created successfully.
 */
router.post("/", createRecipeHandler);

/**
 * @swagger
 * /recipes/{id}:
 *   get:
 *     tags:
 *       - Recipes
 *     summary: GET a recipe by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The recipe ID
 *     responses:
 *       200:
 *         description: Recipe found.
 */
router.get("/:id", getRecipeHandler);

/**
 * @swagger
 * /recipes/{id}:
 *   delete:
 *     tags:
 *       - Recipes
 *     summary: DELETE a recipe
 *     description: Deletes a recipe by ID. Requires a valid API key.
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The recipe ID
 *     responses:
 *       200:
 *         description: Recipe deleted successfully.
 */
router.delete("/:id", requireApiKey, deleteRecipeHandler);

export default router;