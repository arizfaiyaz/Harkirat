# Harkirat — Node.js/Express Playground

A collection of small Node.js/Express projects exploring APIs, middleware, file I/O, auth, and more. Each folder is a self-contained example with its own `package.json` and server entry.

## Repository structure

- `express/` — Simple Express demos (e.g., kidney stats example)
- `todofile/` — File-backed Todo API (with an improved, middleware-based version)
- `Course-selling-app/` — Express app with routes, controllers, and session middleware
- `backendtodo/`, `DB/`, `auth/`, `cors/`, `sumserver/`, `basics/`, `NODE/` — Additional experiments and examples

Tip: Most folders have their own `index.js` and `package.json`. Install and run them independently.

## Prerequisites

- Node.js (LTS recommended)
- npm (bundled with Node)

Verify versions:

```sh
node -v
npm -v
```

## Getting started (per project)

Install dependencies and run from the project folder you want to explore, for example:

```sh
# Example: run the express demo
cd express
npm install
node index.js

# Example: run the file-based todo API
cd todofile
npm install
node index.js            # basic version
# or
node improved-index.js   # middleware version
```

Servers default to port 3000 unless otherwise noted.

## File-based Todo API (`todofile/`)

Persists todos to `todofile/todosData.json` and exposes REST endpoints. Two implementations are provided:

- `index.js`: straightforward routes
- `improved-index.js`: uses layered middleware for validation, data loading, and error handling

### Endpoints (middleware version)

Base URL: `http://localhost:3000`

- POST `/todos/create`
	- Body: `{ "id": number, "todo": string }`
	- Creates a todo. Returns 201 on success.

- DELETE `/todos/delete/:id`
	- Deletes by numeric `id`. Returns deleted item.

- PUT `/todos/update/:id`
	- Body: `{ "todo": string }`
	- Updates title. Returns updated item.

- GET `/todos/read/all`
	- Returns all todos (with a helpful message when empty).

- GET `/todos/read/:id`
	- Returns a single todo by `id`.

### Middleware highlights (in `improved-index.js`)

- `requestLogger` — timestamped request logs
- `validateId` — ensures `:id` params are numbers
- `validateTodoInput` — checks body fields for POST/PUT
- `loadTodos` — reads todos once and attaches to `req`
- `checkTodoExists` / `checkTodoNotExists` — business rules
- Centralized error handler with consistent JSON responses

Benefits: DRY validation, clearer handlers, consistent status codes, and easier testing.

## Express demo (`express/`)

Small examples showing request parsing and basic JSON responses. Useful for experimenting with routes and body parsing.

## Course selling app (`Course-selling-app/`)

Demonstrates a more structured Express app:

- `routes/` — route definitions
- `controllers/` — request handlers
- `middleware/` — admin/user auth and session middleware
- `config/sessionConfig.js` — session configuration

Install and run inside the folder. Check code for current routes and any required environment variables.

## Common issues & tips

- Port already in use (EADDRINUSE): stop existing Node processes or change the port.
- JSON parse errors: ensure `Content-Type: application/json` and valid JSON bodies.
- File permissions: the Todo API writes to `todosData.json`; ensure the app can read/write this file.

## Contributing

These are learning projects. Feel free to experiment, refactor, and extend. If you add a new example, include a short note here and minimal run steps.

## License

MIT (or your preferred license)

