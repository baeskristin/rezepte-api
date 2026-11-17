import express from "express";
import recipeRoutes from "./recipes/routes";

const app = express();
app.use(express.json());

// GET Welcome message
app.get("/", (req, res) => {
    res.send("Willkommen bei der Rezepte-API 👋");
});

// GET Health-Check
app.get("/health", (req, res) => {
    res.json({ status: "ok" });
});

app.use("/recipes", recipeRoutes);

export default app;