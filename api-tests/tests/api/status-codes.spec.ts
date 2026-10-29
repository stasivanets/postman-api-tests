import { test, expect } from '@playwright/test';

const cases = [
  { path: '/posts/9999', expectedStatus: 404 },
  { path: '/posts/abc', expectedStatus: 404 },
  { path: '/comments/99999', expectedStatus: 404 },
];

for (const c of cases) {
  test(`GET ${c.path} returns ${c.expectedStatus}`, async ({ request }) => {
    const response = await request.get(c.path);
    expect(response.status()).toBe(c.expectedStatus);
  });
}

const httpbinCases = [401, 403, 429, 500, 503];

for (const status of httpbinCases) {
  test(`httpbin returns ${status}`, async ({ request }) => {
    const response = await request.get(`https://httpbin.org/status/${status}`);
    expect(response.status()).toBe(status);
  });
}