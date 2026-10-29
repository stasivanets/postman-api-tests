import { test, expect } from '@playwright/test';

test.use({ extraHTTPHeaders: { Authorization: 'Bearer my-test-token' } });

test('PUT updates a post', async ({ request }) => {
  const response = await request.put('/posts/1', {
    data: { id: 1, title: 'Updated title', body: 'new body', userId: 1 },
  });

  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body.title).toBe('Updated title');
});

test('DELETE removes a post', async ({ request }) => {
  const response = await request.delete('/posts/1');
  expect(response.status()).toBe(200);
});

test('request with a Bearer token succeeds', async ({ request }) => {
  const response = await request.get('https://httpbin.org/bearer', {
    headers: { Authorization: 'Bearer my-test-token' },
  });
  expect(response.status()).toBe(200);
});

test('request without a token returns 401', async ({ request }) => {
  const response = await request.get('https://httpbin.org/bearer');
  expect(response.status()).toBe(401);
});