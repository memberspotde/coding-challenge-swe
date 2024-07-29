import { Express } from "express";
import { Route } from "./Route";
import {
  getOpenApiPaths,
  getOpenApiQueryParameters,
} from "../api-definition/openapi";
import { SwapiEndpoint } from "../endpoint/SwapiEndpoint";
import { ApiPaths } from "../api-definition/enums";

export async function setupRoutes(app: Express): Promise<void> {
  const paths = getOpenApiPaths();
  console.log("Setting up routes with paths:", paths);

  for (const path in paths) {
    console.log("Checking path:", path);
    //TODO: Check whether defining parameters should be done within the Route class
    if (path === ApiPaths.Characters) {
      console.log("Setting up route for path:", path);
      const definedParams = await getOpenApiQueryParameters(path, "get");
      console.log("Defined params for path:", path, definedParams);
      definedParams.forEach((param, index) => {
        console.log("Query Param ", index, " = ", param);
      });

      const characterRoute = new Route(path, definedParams);
      characterRoute.setup(app);
    }
  }
}
