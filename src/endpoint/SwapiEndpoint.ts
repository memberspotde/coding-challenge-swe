import { Endpoint } from "./interfaces";
import { ApiMethod } from "./types";
import axios, { all, AxiosRequestConfig } from "axios";
import NodeCache from "node-cache";
import { getCacheKey } from "./cache";
import { RequestOptions } from "./interfaces";
import { any } from "openapi-typescript-validator";
import { startupSnapshot } from "v8";
import { start } from "repl";
import { SwapiEndpointError } from "../error";
import { sharedCache } from "..";
import { stringify } from "querystring";

export class SwapiEndpoint implements Endpoint {
  baseUrl: string;
  path: string;
  params?: Record<string, string>; //change to be specific
  method: "GET"; //only get is possible
  headers?: Record<string, string>;
  authToken?: string;
  //for Pagination of SWAPI Data
  pagination?: boolean;
  appPage?: number;
  limitPerPage?: number;
  totalItems?: number;
  requestURL?: string;

  constructor(path: string, method: "GET", options: RequestOptions) {
    this.baseUrl = "https://swapi.dev/api/";
    this.path = path;
    this.method = method;
    this.params = options.params;
    this.headers = options.headers; //TODO: make type safe
    //pagination
    this.pagination = options.pagination || false;
    this.appPage = options.appPage;
    this.limitPerPage = options.limitPerPage ?? 10;
    //test
  }

  public async fetchData(): Promise<any> {
    console.log("SE - Fetching data from SWAPI for path:", this.getFullUrl());

    try {
      // check if data is already cached
      const mykeys = sharedCache.keys();
      console.log("Active Keys ", mykeys);
      const cacheKeyInput = JSON.stringify({
        params: this.params ?? {}, // Provide an empty object as a default value
        pagination: this.pagination,
        appPage: this.appPage,
        limitPerPage: this.limitPerPage,
      });

      const cacheKey = getCacheKey(cacheKeyInput);
      const cachedData = sharedCache.get(cacheKey);
      if (cachedData) {
        console.log("SE - Cache hit for key:", cacheKey);
        console.log("SE - Cached Data", cachedData);
        return cachedData;
      }
      console.log("SE - Cache miss for key:", cacheKey);

      let responseData;
      this.totalItems = await this.fetchMetaDataInitialRequest();

      // If no items found, return a specific response
      if (this.totalItems === 0) {
        return { count: 0, results: [] };
      }
      //fetch pages
      if (this.pagination) {
        responseData = await this.fetchPages();
        console.log(
          `SE - Page ${this.appPage} w/ limit of ${this.limitPerPage} `
        );
      }
      // fetch all data
      else {
        responseData = await this.fetchAll();
        console.log("SE - All Data fetched");
      }

      // Fetch and aggregate homeworld data
      const aggregatedData =
        await this.fetchAndAggregateHomeworldData(responseData);

      //cache data
      const cacheSucess = sharedCache.set(cacheKey, {
        count: this.totalItems,
        results: aggregatedData,
      });
      if (!cacheSucess) {
        throw new SwapiEndpointError("setting Cache did not work ");
      }
      console.log("SE - aggreagated", aggregatedData);
      console.log("Data cached for key:", cacheKey);
      // console.log("API response:", responseData);
      return { count: this.totalItems, results: aggregatedData };
    } catch (e) {
      console.error("SE - fetching Data from SWAPI failed ", e);
    }
  }

  //
  private async fetchPages(): Promise<any> {
    let paginatedData: any[] = [];
    try {
      const [startItemIndex, startPage, endPage] =
        await this.getSwapiPageRangeForDesiredPage();
      console.log(
        `SE - Swapi Page Range: startPage= ${startPage}, EndPage=${endPage}, startIndex=${startItemIndex}`
      );
      const dataExtendingThePage = await this.getSwapiDataFromPageRange(
        startPage,
        endPage
      );
      console.log("SE - Full fetched data");
      const limitPerPage = this.limitPerPage ?? 10; //default to 10 per page
      paginatedData = this.extractPaginatedData(
        dataExtendingThePage,
        startItemIndex,
        limitPerPage
      );
      console.log("extracted fetched data");
      return paginatedData;
    } catch (e) {
      console.error(
        `Fetching data from Swapi Pages for single App Page failed`,
        e
      );
    }
  }

  private async fetchAll(): Promise<any[]> {
    let allData: any[] = [];
    try {
      let nextUrl: string | null = this.getFullUrl();
      while (nextUrl) {
        const config = this.getConfig(nextUrl);
        const response = await axios(config);
        allData = allData.concat(response.data.results);
        nextUrl = response.data.next;
      }
    } catch (e) {
      console.error("fetching all Data from SWAPI failed", e);
    }
    return allData;
  }

  private getConfig(url?: string): AxiosRequestConfig {
    const config: AxiosRequestConfig = {
      method: this.method,
      url: url || this.getFullUrl(),
      headers: {
        "Content-Type": "application/json", // Default header
        ...this.headers,
        ...(this.authToken
          ? { Authorization: `Bearer ${this.authToken}` }
          : {}),
      },
      params: this.params,
    };

    return config;
  }

  //get full path
  private getFullUrl(): string {
    let url = new URL(this.baseUrl + this.path);

    //if params are
    if (this.params) {
      Object.keys(this.params).forEach((key) => {
        url.searchParams.append(key, this.params![key]);
      });
    }
    return url.toString();
  }

  private extractPaginatedData(
    data: any[],
    startIndex: number,
    limit: number
  ): any[] {
    const startIndexWithinData = startIndex % 10;
    const endIndexWithinData = startIndexWithinData + limit;
    return data.slice(startIndexWithinData, endIndexWithinData);
  }

  private async fetchMetaDataInitialRequest() {
    // Initial fetch to get count and first page
    const initialResponse = await axios(this.getConfig());
    const { count } = initialResponse.data;
    console.log("SE - Initial Req: Metadata -> 1. ", count);
    return count;
  }

  private async getSwapiPageRangeForDesiredPage() {
    // Determine item range and SWAPI pages to fetch
    if (!this.totalItems) {
      throw new SwapiEndpointError(
        "totalItems is undefined. Ensure it is fetch in an initial SWAPI request before calling this method"
      );
    }
    const [startIndex, endIndex] = this.determineItemRange(
      this.appPage!,
      this.limitPerPage!,
      this.totalItems
    );
    const [startSwapiPage, endSwapiPage] = this.determineSwapiPages(
      startIndex,
      endIndex
    );

    return [startIndex, startSwapiPage, endSwapiPage];
  }

  private async getSwapiDataFromPageRange(start: number, end: number) {
    let allData: any[] = [];
    console.log(`SE - Getting Data From Swapi`);
    for (let page = start; page <= end; page++) {
      const nextUrl = this.changePageQPOfUrl(page);
      const nextConfig = this.getConfig(nextUrl);
      const response = await axios(nextConfig);
      allData = allData.concat(response.data.results);
      console.log(
        `SE - nextUrl=${nextUrl} nextConfig=${nextConfig}, data =${allData}`
      );
    }
    return allData;
  }

  private changePageQPOfUrl(page: number): string {
    let url = new URL(this.getFullUrl());
    url.searchParams.set("page", page.toString());
    return url.toString();
  }

  //0-based pages
  private determineItemRange(
    page: number,
    limit: number,
    max: number
  ): [number, number] {
    const start = page * limit;
    const endPos = (page + 1) * limit;
    const end = endPos <= max ? endPos : max;
    return [start, end];
  }

  //0-based pages
  private determineSwapiPages(
    startIndex: number,
    endIndex: number
  ): [number, number] {
    const limit = 10; // SWAPI's page limit
    const startPage = Math.floor(startIndex / limit) + 1; // SWAPI pages are 1-based
    const endPage = Math.floor((endIndex - 1) / limit) + 1; // Subtract 1 to get inclusive end
    return [startPage, endPage];
  }

  private async fetchAndAggregateHomeworldData(data: any[]): Promise<any[]> {
    // Map over the input data array to create an array of promises
    const homeworldRequests = data.map(async (character) => {
      try {
        const response = await axios.get(character.homeworld);
        return {
          ...character,
          homeworldData: response.data.name,
        };
      } catch (error) {
        console.error(
          `Error fetching homeworld data for ${character.name}`,
          error
        );
        return character; // Return character without homeworld data if error occurs
      }
    });

    // Await the completion of all promises and return the result
    const results = await Promise.all(homeworldRequests);

    // Check if data aggregation worked
    results.forEach((result, index) => {
      if (result.homeworldData) {
        console.log(
          `Homeworld data for ${result.name} fetched successfully: ${result.homeworldData}.`
        );
      } else {
        console.log(`Failed to fetch homeworld data for ${result.name}.`);
      }
    });

    return results;
  }
}
