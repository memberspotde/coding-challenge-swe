# Coding Challenge [SWE] @ Memberspot

## Incentive

This task will cover a few core concepts that you will encounter when working on a TypeScript project at Memberspot.

## Challenge

Write a small application that fetches data from an API (we recommend [this one](https://www.swapi.tech/documentation)) and displays it in a paginated list.

### Requirements

1. Display a list of data with at least 4 fields.
   1. The list should include at least 1 aggregated value.
   2. For the [example API](https://www.swapi.tech/documentation), display a person's _name_, _birth_year_, _homeworld_, and the homeworld's _terrain_.
2. Implement an input above the list to **case insensitively** filter the data.
3. The list should be paginated, with a page size of 10. (_Lazy loading_ is preferred over traditional pagination).
4. Have some fun and be creative!

### Notes and Hints

0. You are free to choose any technology you want, but...
1. Our company has a decided tech stack:
   1. Angular for client-side apps.
   2. NestJS for server-side apps.
   3. Tailwind CSS.
2. Use an API.
   1. If it is public, try to **cache** your data and make **as few requests** as possible.
   2. Feel free to build your own.
3. If you want to mock a database, use a JSON file and load it into memory.
4. Please use `strict` mode in your tsconfig.

### Submitting

1. Fork this repo and send us your solutions.
2. Notify Memberspot.

## Alternatives

If you do not have time for a take-home assignment, let us know! In this case, we would try to implement parts of it live in a technical interview.

If you have a project to which you contribute regularly, we can also discuss that. We are interested in your work.
