# API Test Automation Demo

![Playwright API tests](https://github.com/stasivanets/postman-api-tests/actions/workflows/playwright-api.yml/badge.svg)

API test automation examples by a QA engineer: a **Playwright + TypeScript** suite and a **Postman/Newman** collection, both run in **GitHub Actions**.

## What is covered

- CRUD requests: GET, POST, PUT, DELETE
- Status code and response body assertions
- Auth headers (Bearer token), with positive and negative cases
- Shared setup with `beforeAll` and a reusable API client
- Chaining: a value from one response used in the next request
- Data-driven tests for expected status codes
- HTML test report saved as a build artifact in CI

Tests run against public practice APIs: [JSONPlaceholder](https://jsonplaceholder.typicode.com) and [httpbin](https://httpbin.org).

## Project structure

```
.github/workflows/   CI pipelines (Playwright and Newman)
api-tests/           Playwright + TypeScript API tests
  tests/api/         test files
  playwright.config.ts
```

## Run the tests locally

Requirements: Node.js 18 or newer.

```bash
cd api-tests
npm ci
npx playwright test tests/api --project=chromium
```

Open the HTML report after a run:

```bash
npx playwright show-report
```

Run a single file:

```bash
npx playwright test tests/api/posts.spec.ts --project=chromium --reporter=list
```

## Run in CI

The workflow `.github/workflows/playwright-api.yml` runs on every push to `main` and on pull requests. It checks out the code, installs Node.js and dependencies, runs the API tests, and uploads the HTML report as the `playwright-report` artifact (available even when tests fail).

To run it manually or see results, open the **Actions** tab of the repository.

## Notes

- Tests that call httpbin depend on a free public service, so an occasional failure there can come from the service, not from the test code.
- API tests need no browser, so browsers are not installed in CI.