import express from "express";
import { recipes } from "./recipes";

const app = express();
app.use(express.json());

const PORT = 3000;

// GET Welcome message
app.get("/", (req, res) => {
    res.send("Willkommen bei der Rezepte-API 👋");
});

// GET Health-Check
app.get("/health", (req, res) => {
    res.json({ status: "ok" });
});

// GET all recipes and optional filter by maxMinutes
app.get("/recipes", (req, res ) => {
    const maxMinutes = Number(req.query.maxMinutes);

     if (maxMinutes) {
        return res.json(
            recipes.filter((recipe) => recipe.minutes <= maxMinutes)
        );
    } 

    res.json(recipes)
});

// GET recipe by id
app.get("/recipes/:id", (req, res) => {

    const id = Number(req.params.id);
    const recipe = recipes.find((recipe) => recipe.id === id);

    if (!recipe) {
        return res.status(404).json({
            fehler: "Rezept nicht gefunden",
        });
    }

    res.json(recipe)
});

app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});