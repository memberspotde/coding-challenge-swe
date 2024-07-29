export class SwapiEndpointError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SwapiEndpointError";
  }
}
