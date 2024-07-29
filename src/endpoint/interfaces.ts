export interface Endpoint {
  baseUrl: string;
  path: string;
  params?: Record<string, string>;
  method: "GET" | "POST" | "PUT" | "DELETE";
  headers?: Record<string, string>;
  authToken?: string;
}

export interface RequestOptions {
  params?: Record<string, string>;
  headers?: Record<string, string>;
  authToken?: string;
  pagination?: boolean;
  appPage?: number;
  limitPerPage?: number;
}
