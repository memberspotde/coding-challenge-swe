import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpParams,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl: string = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  /**
   * Makes a GET request to the specified endpoint with optional query parameters.
   * @param endpoint The API endpoint to call.
   * @param params Optional query parameters.
   * @returns An observable of type T.
   */
  get<T>(endpoint: string, params?: { [key: string]: any }): Observable<T> {
    // Initialize HttpParams and set query parameters if provided.
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach((key) => {
        httpParams = httpParams.set(key, String(params[key]));
      });
    }

    // Construct the full URL for the API call.
    const url = `${this.baseUrl}/${endpoint}`;
    console.log('Making API call to:', url, 'with params:', params);

    // Make the HTTP GET request and handle the response body
    return this.http.get<T>(url, { params: httpParams, observe: 'body' }).pipe(
      map(this.handleResponse), // Handle the response.
      catchError(this.handleError), // Handle errors.
    );
  }

  /**
   * Handles the API response by logging it and returning it.
   * @param response The API response.
   * @returns The response.
   */
  private handleResponse<T>(response: T): T {
    console.log('API response:', response);
    return response;
  }

  /**
   * Handles API errors by logging them and returning an observable error.
   * @param error The HTTP error response.
   * @returns An observable error.
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('API call error:', error);
    return throwError(() => new Error('Failed to fetch data'));
  }
}
