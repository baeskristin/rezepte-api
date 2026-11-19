import express from "express";
import { logger } from "./middleware/logger.ts";
import { ErrorHandler } from "./middleware/error.ts";
import recipeRoutes from "./recipes/routes.ts";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "../swagger.ts";

const app = express();
app.use(express.json());

app.get("/openapi.json", (req, res) => {
  res.json(swaggerSpec);
});

// Custom Swagger UI for Vercel (otherwise static files were not available after deployment)
app.get("/swagger", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html>
<head>
  <title>Recipe API Docs</title>
  <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist/swagger-ui.css">
</head>
<body>
  <div id="swagger-ui"></div>

  <script src="https://unpkg.com/swagger-ui-dist/swagger-ui-bundle.js"></script>
  <script>
    SwaggerUIBundle({
      url: "/openapi.json",
      dom_id: "#swagger-ui"
    });
  </script>
</body>
</html>
`);
});

app.use(logger);

app.get("/", (req, res) => {
    res.send("Willkommen bei der Rezepte-API 👋");
});

app.get("/health", (req, res) => {
    res.json({ status: "ok" });
});

app.get("/crash", (req, res) => {
  throw new Error("Absichtlicher Absturz zum Testen");
});

app.use("/recipes", recipeRoutes);

app.use((req, res) => {
  res.status(404).json({
    fehler: `Route ${req.method} ${req.originalUrl} existiert nicht`,
  });
});

app.use(ErrorHandler);

export default app;