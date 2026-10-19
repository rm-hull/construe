# AGENTS.md

## Project Overview

This is a web application built with React, TypeScript, and Vite, using Chakra UI for the user interface. It provides word-related functionality with pages for home and word management.

### Project Structure

- `src/components`: Reusable React components (e.g., `Centered`, `Letter`, `transitions`, `ui`).
- `src/hooks`: Custom React hooks for managing state and side effects (e.g., `useCounter`, `useWordList`).
- `src/pages`: Top-level page components that correspond to routes (`Home`, `Words`).

### Key Technologies:

- **Frontend Framework:** React
- **Language:** TypeScript
- **Build Tool:** Vite
- **Package Manager:** pnpm
- **UI Components:** Chakra UI
- **Data Fetching:** axios, react-query
- **Routing:** react-router-dom
- **Utilities:** Ramda
- **Testing:** Vitest

## Building and Running

### Commands:

- **Install dependencies:**
  ```bash
  pnpm install
  ```
- **Run the development server:**
  ```bash
  pnpm dev
  ```
- **Build for production:**
  ```bash
  pnpm build
  ```
- **Lint the code:**
  ```bash
  pnpm lint
  ```
- **Preview the production build:**
  ```bash
  pnpm preview
  ```

## Development Conventions

- The project uses [Vite](https://vitejs.dev/) for development and building.
- [ESLint](https://eslint.org/) is used for linting the code.
- [Prettier](https://prettier.io/) is used for code formatting.
- The project uses [Chakra UI](https://chakra-ui.com/) for UI components.
- The project uses [Vitest](https://vitest.dev/) for testing.
- The project follows the conventional commits specification for commit messages.
