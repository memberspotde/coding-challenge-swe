import express from "express";
import { setupOpenApi } from "./api-definition/openapi";
import { setupRoutes } from "./routes/routes";
import cors from "cors";
import NodeCache from "node-cache";

// Express setup
const app = express();
const port = 3000;
const baseUrl = `http://localhost:${port}`;

setupMiddleware();
startServer();

//setup cache
export const sharedCache = new NodeCache({ stdTTL: 3600 });

async function startServer() {
  try {
    console.log("Setting up routes...");
    await setupRoutes(app);
    console.log("Routes setup completed.");

    app.listen(port, () => {
      console.log(`Server running at ${baseUrl}`);
    });
  } catch (error) {
    console.error("Error setting up server:", error);
  }
}

function setupMiddleware() {
  try {
    console.log("Setting up Express...");
    app.use(express.json()); // Set up middleware

    console.log("Setting up OpenAPI...");
    setupOpenApi(app);

    console.log("Setting up cors...");
    app.use(cors());

    app.use((req, res, next) => {
      console.log(`${req.method} ${req.url}`);
      next();
    });
  } catch (e) {
    console.error("Setting up middleware failed", e);
  }
}
