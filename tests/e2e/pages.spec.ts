import { test, expect } from './fixtures'
import {
  FULL_NAME,
  HTTP_STATUS_NOT_FOUND,
  HTTP_STATUS_OK,
  UNKNOWN_USERNAME,
  USERNAME
} from '../constants/e2e'
import { unexpectedErrors } from '../utils/errors'

const PAGES = [
  {
    path: '/',
    status: HTTP_STATUS_OK,
    title: 'Threads Clone',
    heading: 'Log in with username'
  },
  {
    path: `/@${USERNAME}/`,
    status: HTTP_STATUS_OK,
    title: `${FULL_NAME} (@${USERNAME}) on Threads Clone`,
    heading: FULL_NAME
  },
  {
    path: `/@${UNKNOWN_USERNAME}/`,
    status: HTTP_STATUS_NOT_FOUND,
    title: 'User not found - Threads Clone',
    heading: 'User not found'
  },
  {
    path: '/404.html',
    status: HTTP_STATUS_OK,
    title: 'Not found - Threads Clone',
    heading: 'Page not found'
  }
]

test.describe('every page renders without errors', () => {
  for (const { path, status, title, heading } of PAGES) {
    test(path, async ({ page, browserErrors }) => {
      const response = await page.goto(path)

      expect(response?.status()).toBe(status)
      await expect(page).toHaveTitle(title)
      await expect(page.getByRole('heading', { name: heading })).toBeVisible()
      expect(
        unexpectedErrors(browserErrors, { notFoundUrl: response?.url() })
      ).toEqual([])
    })
  }
})
