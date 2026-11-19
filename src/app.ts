import express from "express";
import { logger } from "./middleware/logger.ts";
import { ErrorHandler } from "./middleware/error.ts";
import recipeRoutes from "./recipes/routes.ts";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import morgan from "morgan";

const app = express();
const swaggerSpec = swaggerJSDoc({
    definition: {
        openapi: "3.0.0",
        info: { title: "Recipe API", version: "1.0.0" }
    },
    apis: [`${import.meta.dirname}/**/*.ts`],
  })

const CDN = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.17.14";
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    customCssUrl: `${CDN}/swagger-ui.min.css`,
    customJs: [
        `${CDN}/swagger-ui-bundle.min.js`,
        `${CDN}/swagger-ui-standalone-preset.min.js`,
    ],
}));

app.use(express.json());

// app.use(logger);
app.use(morgan("dev"));

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