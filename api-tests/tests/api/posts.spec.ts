import { test, expect } from '@playwright/test';

test('GET all posts returns a list', async ({ request }) => {
  const response = await request.get('/posts');

  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(Array.isArray(body)).toBeTruthy();
  expect(body.length).toBe(100);
});

test('GET one post returns the right fields', async ({ request }) => {
  const response = await request.get('/posts/1');

  expect(response.ok()).toBeTruthy();
  const body = await response.json();
  expect(body).toHaveProperty('id', 1);
  expect(body).toHaveProperty('title');
  expect(typeof body.userId).toBe('number');
});

test('POST creates a post', async ({ request }) => {
  const response = await request.post('/posts', {
    data: { title: 'QA post', body: 'hello', userId: 1 },
  });

  expect(response.status()).toBe(201);
  const body = await response.json();
  expect(body).toMatchObject({ title: 'QA post', userId: 1 });
  expect(body.id).toBeDefined();
});

test('GET /posts/9999 returns 404', async ({ request }) => {
  const response = await request.get('/posts/9999');
  expect(response.status()).toBe(404);
});

test('GET /posts?userId=1 returns only posts of user 1', async ({ request }) => {
  const response = await request.get('/posts', { params: { userId: 1 } });

  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body.length).toBeGreaterThan(0);
  for (const post of body) {
    expect(post.userId).toBe(1);
  }
});