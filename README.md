# Testing and Debugging MERN Applications

This assignment focuses on implementing comprehensive testing strategies for a MERN stack application, including unit testing, integration testing, and end-to-end testing, along with debugging techniques.

## Assignment Overview

You will:
1. Set up testing environments for both client and server
2. Write unit tests for React components and server functions
3. Implement integration tests for API endpoints
4. Create end-to-end tests for critical user flows
5. Apply debugging techniques for common MERN stack issues

## Project Structure

```
mern-testing/
├── client/                 # React front-end
│   ├── src/                # React source code
│   │   ├── components/     # React components
│   │   ├── tests/          # Client-side tests
│   │   │   ├── unit/       # Unit tests
│   │   │   └── integration/ # Integration tests
│   │   └── App.jsx         # Main application component
│   └── cypress/            # End-to-end tests
├── server/                 # Express.js back-end
│   ├── src/                # Server source code
│   │   ├── controllers/    # Route controllers
│   │   ├── models/         # Mongoose models
│   │   ├── routes/         # API routes
│   │   └── middleware/     # Custom middleware
│   └── tests/              # Server-side tests
│       ├── unit/           # Unit tests
│       └── integration/    # Integration tests
├── jest.config.js          # Jest configuration
└── package.json            # Project dependencies
```

## Getting Started

1. Accept the GitHub Classroom assignment invitation
2. Clone your personal repository that was created by GitHub Classroom
3. Follow the setup instructions in the `Week6-Assignment.md` file
4. Explore the starter code and existing tests
5. Complete the tasks outlined in the assignment

## Files Included

- `Week6-Assignment.md`: Detailed assignment instructions
- Starter code for a MERN application with basic test setup:
  - Sample React components with test files
  # testing-and-debugging-ensuring-mern-app-reliability-paeyden

  A starter repository for Week 6 assignment: implementing testing and debugging strategies for a MERN application. The project contains a minimal Express server, React client components, and example tests for unit and integration testing.

  ## What this repo contains

  - A small Express server in `server/src`
  - Mongoose models in `server/src/models`
  - A React component in `client/src/components`
  - Jest configuration at the repository root (`jest.config.js`) with separate `server` and `client` project settings
  - Example tests and testing utilities (server integration tests use an in-memory MongoDB)

  ## Prerequisites

  - Node.js (recommended v18+)
  - npm (or yarn)

  Note: Tests use `mongodb-memory-server` to avoid requiring a local MongoDB instance.

  ## Install

  From the repository root:

  ```powershell
  npm install
  ```

  ## Available scripts

  - `npm test` — Run all Jest projects (both `client` and `server`).
  - `npm run test:unit` — Run client tests only (selects `client` project).
  - `npm run test:integration` — Run server tests only (selects `server` project).
  - `npm run setup-test-db` — (Informational) Notes test DB setup; tests use `mongodb-memory-server`.

  Run tests in PowerShell like:

  ```powershell
  npm test
  ```

  Or to run only server integration tests:

  ```powershell
  npm run test:integration
  ```

  ## Testing details

  - Jest is configured in `jest.config.js` with two projects: `server` and `client`.
  - Server tests run in a Node environment and use `mongodb-memory-server` to provide a temporary in-memory MongoDB instance. A setup file exists at `server/tests/setup.js` which:
    - Starts `mongodb-memory-server` before tests
    - Connects Mongoose to the in-memory database
    - Clears collections after each test
    - Disconnects and stops the memory server after all tests

  If you encounter the error:

  ```
  Module <rootDir>/server/tests/setup.js in the setupFilesAfterEnv option was not found.
  ```

  Make sure the file `server/tests/setup.js` exists and is accessible from the repository root. This repository includes that file; if you forked or copied the project, confirm it was not omitted.

  ## Project structure (relevant files)

  ```
  .
  ├── client/
  │   └── src/
  │       ├── components/
  │       │   └── Button.jsx
  │       └── tests/
  │           └── unit/
                 └── Button.test.jsx
  ├── server/
  │   ├── src/
  │   │   ├── app.js
  │   │   ├── models/
  │   │   │   ├── post.js
  │   │   │   └── user.js
  │   │   └── utils/
  │   │       └── auth.js
  │   └── tests/
  │       └── setup.js
  ├── jest.config.js
  └── package.json
  ```

  ## Common troubleshooting

  - If Jest says `setupFilesAfterEnv` file not found:
    - Confirm path in `jest.config.js` matches the file location (uses `<rootDir>/server/tests/setup.js`).
    - Confirm your current working directory is repository root when running `npm test`.

  - If `mongodb-memory-server` fails to start or times out:
    - Ensure your environment allows spawning the binaries (antivirus or corporate policies can block). Try increasing Jest timeout or installing a newer `mongodb-memory-server` compatible with your Node version.

  - On Windows with paths that include spaces (e.g., OneDrive locations), tests may still run — but ensure your shell and environment variables are not interfering. Running from a path without spaces can sometimes avoid subtle issues.

  ## Contributing

  This repository is a starter for an assignment. If you want to improve tests, please:

  1. Create a feature branch
  2. Add/edit tests and ensure they pass locally
  3. Open a pull request with a short description of your changes

  ## Notes for instructors / graders

  - Code coverage is enabled in `jest.config.js`. Coverage thresholds are configured under `coverageThreshold` for the assignment.

  ## License

  This repository is provided as an assignment starter. Update the license field in `package.json` and this README as needed for your project.

  ---

  If you'd like, I can:

  - run the tests here and report failures (I attempted earlier but the terminal run was skipped),
  - add a short troubleshooting script, or
  - add badges and CI instructions (GitHub Actions) for automated test runs.

  Tell me which of these you'd like next.
