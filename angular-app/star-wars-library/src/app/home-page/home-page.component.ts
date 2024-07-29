import { Component } from '@angular/core';

@Component({
  selector: 'app-home-page',
  template: `
    <div class="container mx-auto p-4">
      <div [innerHTML]="readmeContent" class="prose prose-lg"></div>
    </div>
  `,
  styles: [
    `
      .readme-content {
        line-height: 1.6;
      }

      .readme-content h1 {
        font-size: 2.25rem; /* Equivalent to text-4xl */
        font-weight: bold;
        margin-bottom: 1rem;
      }

      .readme-content h2 {
        font-size: 1.5rem; /* Equivalent to text-2xl */
        font-weight: 600;
        margin-bottom: 0.5rem;
      }

      .readme-content h3 {
        font-size: 1.25rem; /* Equivalent to text-xl */
        font-weight: 600;
        margin-bottom: 0.5rem;
      }

      .readme-content h4 {
        font-size: 1rem; /* Equivalent to text-lg */
        font-weight: 600;
        margin-bottom: 0.5rem;
      }

      .readme-content p {
        margin-bottom: 1rem;
      }

      .readme-content ul,
      .readme-content ol {
        margin-bottom: 1rem;
        padding-left: 1.5rem;
      }

      .readme-content li {
        margin-bottom: 0.5rem;
      }

      .readme-content pre {
        background-color: #f3f4f6; /* Equivalent to bg-gray-100 */
        padding: 0.5rem;
        border-radius: 0.25rem;
        overflow-x: auto;
      }
    `,
  ],
})
export class HomePageComponent {
  // Define the README content as a class property
  readmeContent: string = `
    <h1 class="text-4xl font-bold mb-4">SWAPI Pagination Challenge</h1>
    <h2 class="text-2xl font-semibold mb-2">Overview</h2>
    <p class="mb-4">
      This project demonstrates a TypeScript-based application that interacts with the Star Wars API (SWAPI) to display a paginated list of characters. It includes both backend and frontend components, featuring custom pagination and a creative user interface with AI-generated images.
    </p>
    <h2 class="text-2xl font-semibold mb-2">Challenge</h2>
    <ul class="list-disc list-inside mb-4">
      <li><strong>Data Display:</strong> Present a list with at least four fields. For the SWAPI, this includes a character’s <em>name</em>, <em>birth_year</em>, <em>homeworld</em>, and the homeworld’s <em>terrain</em>.</li>
      <li><strong>Filtering:</strong> Implement a case-insensitive filter input above the list.</li>
      <li><strong>Pagination:</strong> Implement pagination with a page size of 10, preferably using lazy loading.</li>
      <li><strong>Creativity:</strong> Enhance the application with creative features and design elements.</li>
    </ul>
    <h2 class="text-2xl font-semibold mb-2">Design Decisions</h2>
    <h3 class="text-xl font-semibold mb-1">Backend</h3>
    <h4 class="text-lg font-semibold mb-1">API Handling</h4>
    <ul class="list-disc list-inside mb-4">
      <li><strong>Why Not Filter on Frontend?</strong> The decision was made to use SWAPI's search endpoint for filtering data rather than implementing frontend filtering. This choice may lead to longer loading times and more requests to the SWAPI but demonstrates the ability to handle API interactions and create a backend that acts as an intermediary between the frontend and a third-party API.</li>
      <li><strong>Backend Pagination:</strong> Although SWAPI provides inherent pagination (10 items per page), the backend is designed to support custom pagination. It makes an initial request to SWAPI with the search query to determine the total number of items. The backend then fetches only the necessary pages and extracts the required item range.</li>
    </ul>
    <h4 class="text-lg font-semibold mb-1">Caching</h4>
    <p class="mb-4">
      <strong>Purpose:</strong> Responses from SWAPI are cached for one hour to reduce the number of API calls, improve performance for repeated requests, and minimize the load on the SWAPI server.
    </p>
    <h4 class="text-lg font-semibold mb-1">API Definition</h4>
    <p class="mb-4">
      <strong>OpenAPI (Swagger):</strong> The backend API is defined using OpenAPI (Swagger). This ensures all requests from the frontend are validated against the defined API schema, maintaining consistency and reducing potential errors.
    </p>
    <h3 class="text-xl font-semibold mb-1">Frontend</h3>
    <h4 class="text-lg font-semibold mb-1">Design and UI</h4>
    <ul class="list-disc list-inside mb-4">
      <li><strong>Character Cards:</strong> The frontend features character cards with AI-generated images and color accents. This not only makes the interface more engaging but also showcases the integration of additional data and visual elements.</li>
      <li><strong>Aggregated Data:</strong> For simplicity, the frontend directly accesses the homeworld name from the character data without making an additional request to the /planet endpoint.</li>
    </ul>
    <h4 class="text-lg font-semibold mb-1">Pagination and Filtering</h4>
    <ul class="list-disc list-inside mb-4">
      <li><strong>Lazy Loading:</strong> Implemented lazy loading to enhance performance by loading character cards only when they enter the viewport. This approach ensures a smoother user experience and reduces initial load time.</li>
      <li><strong>Filtering:</strong> The frontend performs case-insensitive filtering on the data, allowing users to search and filter characters based on their names effectively.</li>
    </ul>
    <h4 class="text-lg font-semibold mb-1">Performance Considerations</h4>
    <ul class="list-disc list-inside mb-4">
      <li><strong>@defer Syntax:</strong> Used Angular's @defer syntax to load character cards as they become visible. To emphasize this effect, a minimum loading time was added for the loader component. This can be adjusted or removed for faster loading.</li>
      <li><strong>Learning and Feedback:</strong> As a developer new to Angular and SaaS applications, the focus has been on functionality and user experience. Feedback on performance optimization and best practices is welcomed.</li>
    </ul>
    <h2 class="text-2xl font-semibold mb-2">Setup Instructions</h2>
    <ol class="list-decimal list-inside mb-4">
      <li><strong>Clone the Repository:</strong>
        <pre class="bg-gray-100 p-2 rounded"><code>git clone &lt;repository-url&gt;
cd &lt;repository-directory&gt;</code></pre>
      </li>
      <li><strong>Install Dependencies:</strong>
        <pre class="bg-gray-100 p-2 rounded"><code>./setup.sh</code></pre>
      </li>
      <li><strong>Start the Application:</strong>
        <pre class="bg-gray-100 p-2 rounded"><code>./start.sh</code></pre>
      </li>
    </ol>
    <h3 class="text-xl font-semibold mb-1">Notes</h3>
    <ul class="list-disc list-inside mb-4">
      <li><strong>Strict Mode:</strong> TypeScript's strict mode is enabled to ensure comprehensive type-checking and reduce runtime errors. This includes options like strictNullChecks, noImplicitAny, and strictPropertyInitialization.</li>
      <li><strong>Performance:</strong> The application is designed to be functional and visually appealing, with performance considerations taken into account. Feedback on optimization and best practices is appreciated.</li>
    </ul>
  `;
}
