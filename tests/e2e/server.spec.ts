import { test, expect } from '@playwright/test'
import {
  HTTP_STATUS_NOT_FOUND,
  HTTP_STATUS_OK,
  PAGE_CACHE_CONTROL,
  UNKNOWN_USERNAME,
  USERNAME
} from '../constants/e2e'

const NO_REDIRECTS = 0
const HTTP_STATUS_FOUND = 302

test.skip(({ browserName, isMobile }) => isMobile || browserName !== 'chromium')

test.describe('profile routes', () => {
  test('serve the profile with a short cache', async ({ request }) => {
    const response = await request.get(`/@${USERNAME}/`)

    expect(response.status()).toBe(HTTP_STATUS_OK)
    expect(response.headers()['cache-control']).toBe(PAGE_CACHE_CONTROL)
  })

  test('add the trailing slash', async ({ request }) => {
    const response = await request.get(`/@${USERNAME}`, {
      maxRedirects: NO_REDIRECTS
    })

    expect(response.status()).toBe(HTTP_STATUS_FOUND)
    expect(response.headers().location).toBe(`/@${USERNAME}/`)
  })

  test('answer 404 for unknown users', async ({ request }) => {
    const response = await request.get(`/@${UNKNOWN_USERNAME}/`)

    expect(response.status()).toBe(HTTP_STATUS_NOT_FOUND)
    expect(await response.text()).toContain('User not found')
  })
})

test('unknown routes answer 404', async ({ request }) => {
  const response = await request.get('/this/page/does-not-exist/')

  expect(response.status()).toBe(HTTP_STATUS_NOT_FOUND)
})

test.describe('static files', () => {
  for (const path of ['/robots.txt', '/manifest.json', '/favicon.ico']) {
    test(path, async ({ request }) => {
      const response = await request.get(path)

      expect(response.status()).toBe(HTTP_STATUS_OK)
    })
  }
})
