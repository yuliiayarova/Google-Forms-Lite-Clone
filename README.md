# Google Forms Lite Clone

A simplified clone of Google Forms built as a monorepo with a React + TypeScript client and a Node.js GraphQL server.

---

## Features

- Create forms with:
  - title
  - description
  - multiple question types:
    - Text
    - Multiple Choice
    - Checkbox
    - Date
- View all created forms
- Fill out a form and submit responses
- View submitted responses for a specific form
- GraphQL API with in-memory storage
- RTK Query for data fetching and mutations
- React Router for page navigation
- Client-side validation using Yup
- Clean UI styled with CSS Modules

---

## Tech Stack

### Front-End

- React
- TypeScript
- Redux Toolkit
- RTK Query
- React Router
- CSS Modules

### Back-End

- Node.js
- Apollo Server
- GraphQL
- In-memory data store

---

## Project Structure

Google-Forms-Lite-Clone/
├── client/ # React application
├── server/ # GraphQL API
└── package.json

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yuliiayarova/Google-Forms-Lite-Clone.git
cd Google-Forms-Lite-Clone
```

### 2. Install dependencies

Install root dependencies:
npm install

Install client dependencies:
cd client
npm install

Install server dependencies:
cd ../server
npm install

Return to the project root:
cd ..

### Running the Project

Start both client and server concurrently from the project root:
npm run dev

### Default local URLs

Client: http://localhost:5173
Server: http://localhost:4000

### Available Scripts

## Root

npm run dev
Runs both the client and server concurrently.

## Client

npm run dev
Starts the Vite development server.

## Server

npm run dev
Starts the GraphQL server.

## GraphQL API

### Queries

- `forms` — returns a list of all created forms
- `form(id: ID!)` — returns a single form by its ID
- `responses(formId: ID!)` — returns all responses for a specific form

### Mutations

- `createForm(title: String!, description: String, questions: [QuestionInput!])`
- `submitResponse(formId: ID!, answers: [AnswerInput!])`

## Implementation Notes

- RTK Query is used for all API communication and caching.
- Business logic is separated into custom hooks and utility functions.
- Dynamic form state (builder & fill) is handled locally with React state.
- Reusable UI components:
  - `FormCard`
  - `QuestionRenderer`
  - `QuestionEditor`
  - `QuestionOptionsEditor`

---

## Notes

- The server uses in-memory storage.
- Data does not persist after restarting the server.
- No authentication is implemented, as it is not required for this test task.
- GraphQL types are currently maintained manually. Code generation was considered as a possible future improvement.
