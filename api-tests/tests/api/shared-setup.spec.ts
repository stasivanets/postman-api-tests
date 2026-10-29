import { test, expect, APIRequestContext } from '@playwright/test';

let api: APIRequestContext;
let firstPost: { id: number; title: string; userId: number };

test.beforeAll(async ({ playwright }) => {
  api = await playwright.request.newContext({
    baseURL: 'https://jsonplaceholder.typicode.com',
    extraHTTPHeaders: { Authorization: 'Bearer my-test-token' },
  });

  const response = await api.get('/posts/1');
  firstPost = await response.json();
});

test.afterAll(async () => {
  await api.dispose();
});

test('shared client can read a post', async () => {
  const response = await api.get('/posts/2');
  expect(response.status()).toBe(200);
});

test('data prepared in beforeAll is available', async () => {
  expect(firstPost.id).toBe(1);
  expect(firstPost.title).toBeDefined();
});

test('shared client lists posts of the same user', async () => {
  const response = await api.get('/posts', { params: { userId: firstPost.userId } });
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body.length).toBeGreaterThan(0);
});