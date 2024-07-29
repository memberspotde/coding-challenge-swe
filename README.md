# SWAPI Pagination Challenge

## Overview

This project demonstrates a TypeScript-based application that interacts with the Star Wars API (SWAPI) to display a paginated list of characters. It includes both backend and frontend components, featuring custom pagination and a creative user interface with AI-generated images.

## Challenge

The challenge involves developing an application with the following requirements:

1. **Data Display**: Present a list with at least four fields. For the SWAPI, this includes a character’s _name_, _birth_year_, _homeworld_, and the homeworld’s _terrain_.
2. **Filtering**: Implement a case-insensitive filter input above the list.
3. **Pagination**: Implement pagination with a page size of 10, preferably using lazy loading.
4. **Creativity**: Enhance the application with creative features and design elements.

## Design Decisions

### Backend

1. **API Handling**

   - **Why Not Filter on Frontend?**: The decision was made to use SWAPI's search endpoint for filtering data rather than implementing frontend filtering. This choice may lead to longer loading times and more requests to the SWAPI but demonstrates the ability to handle API interactions and create a backend that acts as an intermediary between the frontend and a third-party API.

   - **Backend Pagination**: Although SWAPI provides inherent pagination (10 items per page), the backend is designed to support custom pagination. It makes an initial request to SWAPI with the search query to determine the total number of items. The backend then fetches only the necessary pages and extracts the required item range.

2. **Caching**

   - **Purpose**: Responses from SWAPI are cached for one hour to reduce the number of API calls, improve performance for repeated requests, and minimize the load on the SWAPI server.

3. **API Definition**

   - **OpenAPI (Swagger)**: The backend API is defined using OpenAPI (Swagger). This ensures all requests from the frontend are validated against the defined API schema, maintaining consistency and reducing potential errors.

### Frontend

1. **Design and UI**

- **Character Cards**: The frontend includes character cards with AI-generated images and color accents. This design choice was made to spice it up and have a litte fun along the challenge and to make the interface more engaging and to showcase the integration of additional data and visual elements.

- **Aggregated Data**: For simplicity, the frontend directly accesses the homeworld name from the character data without making an additional request to the `/planet` endpoint.

2. **Pagination and Filtering**

- **Lazy Loading**: Angular’s `@defer` syntax was used to implement lazy loading, which improves performance by loading character cards only as they become visible in the viewport. A minimum loading time was added to emphasize this effect but can be adjusted or removed.

- **Filtering**: A case-insensitive filter was implemented to allow users to search and filter characters by name (inherent to swapi )

3. **Performance Considerations**

   - **@defer Syntax**: Used Angular's `@defer` syntax to load character cards as they become visible. To emphasize this effect, a minimum loading time was added for the loader component. This can be adjusted or removed for faster loading.

   - **Learning and Feedback**: As a developer new to Angular and SaaS applications, the focus has been on functionality and user experience. Feedback on performance optimization and best practices is welcomed.

## Development Environment

Platform: This project was developed and tested on macOS. While it should work on other platforms, including Windows, there might be platform-specific issues that were not addressed.

IDE Requirements: Basic development tools such as Node.js and npm must be installed. No specific IDE is required, but using an IDE with TypeScript support is recommended for a better development experience.

## Setup Instructions

To set up and run the application, follow these steps:

1.  **Clone the Repository**
    Either by pulling it direclty or accepting the upstream pull request

    ```
    git clone https://github.com/Sebastian-Mueller-F/coding-challenge-swe.git
    cd coding-challenge-swe
    ```

2.  **Install Dependencies**

Setup Script: Execute the setup.sh script to install all necessary dependencies for both the backend and frontend.

```
    ./setup.sh
```

3.  **Start the Application**

Start Script: Use the start.sh script to start both the backend and frontend servers.

```
        ./start.sh
```

After running these scripts, the application should be accessible in your browser.

### Notes

Strict Mode: TypeScript's strict mode is enabled to ensure comprehensive type-checking and reduce runtime errors.

Performance: The application was designed with functionality and user experience in mind. Due to time constraints, the setup is quite basic, and there has been limited focus on advanced styling. Future work could enhance the styling and introduce more features.
