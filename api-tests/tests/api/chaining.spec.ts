import { test, expect } from '@playwright/test';

test('Post creates a posts used in the next request', async ({ request }) => {
    const postResponse = await request.post('/posts', {
    data: { title: 'Next request POST', body: 'text', userId: 1 },
  });
  expect(postResponse.status()).toBe(201);
  const created = await postResponse.json();

  const putResponse = await request.put('/posts/1', {
    data: { id: 1, title: created.title, body: created.body, userId: created.userId },
  });
  expect(putResponse.status()).toBe(200);
  const updated = await putResponse.json();
  expect(updated.title).toBe('Next request POST');
  expect(updated).toMatchObject({
  title: 'Next request POST',
  body: 'text',
  userId: 1,
});
})