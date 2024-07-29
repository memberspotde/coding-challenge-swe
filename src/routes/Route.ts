import { Express, Request, Response } from "express";
import axios, { AxiosRequestConfig } from "axios";
import NodeCache from "node-cache";
import { SwapiEndpoint } from "../endpoint/SwapiEndpoint";
import { ApiPaths } from "../api-definition/enums";
import { SwapiEndpointError } from "../error";
import { SwapiParams } from "../endpoint/types";

export class Route {
  private path: string;
  private method: "GET"; // REMOVE AS MEMBER VARIALBE -> STATELESS DESIGN

  private definedParams: string[]; // There query parameters the api provides

  constructor(path: string, definedParams: string[]) {
    this.path = path || "";
    this.method = "GET";
    this.definedParams = definedParams;
  }

  public setup(app: Express): void {
    console.log("ROUTE - Setting up route:", this.path);
    app.get(this.path, this.handleRequest.bind(this));
  }

  private async handleRequest(req: Request, res: Response): Promise<void> {
    console.log("ROUTE - Handling request for path:", this.path);
    console.log("ROUTE - Request params:", req.query);

    if (!this.validateParams(req.query)) {
      console.log("ROUTE - Invalid query parameters:", req.query);
      res.status(400).json({ error: "ROUTE - Invalid query parameters" });
    } else {
      const responseData = await this.fetchResponseData(req, res);
      res.json(responseData);
    }
  }

  private async fetchResponseData(
    req: Request,
    res: Response
  ): Promise<void | null> {
    try {
      console.log("ROUTE - Valid query parameters:", req.query);
      let swapiEndpoint = this.createSwapiEndpoints(req);
      swapiEndpoint = this.addParamsToSwapi(req.query, swapiEndpoint);
      const swapiResponseData = await swapiEndpoint.fetchData();
      console.log("ROUTE - SWAPI response data fetched:");
      return swapiResponseData;
    } catch (error) {
      console.error("ROUTE - Failed to fetch data:", error);
      res.status(500).json({ error: "ROUTE - Failed to fetch data" });
      return null;
    }
  }

  private validateParams(params: any): boolean {
    console.log("ROUTE - Validating params:", params);
    return Object.keys(params).every((param) =>
      this.definedParams.includes(param)
    );
  }

  private addParamsToSwapi(params: any, endpoint: SwapiEndpoint) {
    console.log("ROUTE - Adding params to SWAPI:", params);
    if (params && endpoint) {
      const swapiParams = this.extractParamsForSwapi(params);
      endpoint.params = swapiParams;
    }
    return endpoint;
  }

  private extractParamsForSwapi(params: any) {
    delete params.pagination;
    delete params.page;
    delete params.limit;

    const swapiParams: SwapiParams = { ...params };

    // Exclude pagination parameters from searchParams

    return swapiParams;
  }

  private extractPaginationParams(params: any) {
    const pagination = params.pagination === "true"; // Check if pagination is true

    let page = params.page
      ? Math.max(0, parseInt(params.page as string)) //TODO: change minimal page to  CONST
      : undefined;
    let limit = params.limit
      ? Math.max(10, parseInt(params.limit as string)) //TODO change minimal limit to  CONST
      : undefined;

    if (!page) {
      page = 0;
    }
    if (!limit) {
      limit = 10;
    }

    return { pagination, page, limit };
  }

  private createSwapiEndpoints(req: Request): SwapiEndpoint {
    //check wether to show pagination:
    const { pagination, page, limit } = this.extractPaginationParams(req.query);

    switch (this.path) {
      case ApiPaths.Characters: {
        const peopleEndpoint = new SwapiEndpoint("people", "GET", {
          pagination: pagination,
          appPage: page,
          limitPerPage: limit,
        });
        console.log(
          `ROUTE - Swapi Endpoint created with: pagination=${pagination} page=${page} limit=${limit}, `
        );
        return peopleEndpoint;
      }
      default: {
        throw new SwapiEndpointError(
          "ROUTE - This SWAPI Endpoint does not exist."
        );
      }
    }
  }
}
