import { expect } from '@playwright/test'
import type { Page } from '@playwright/test'

// The layout shows a full screen splash for a second after hydration.
export async function openPage(page: Page, path: string) {
  await page.goto(path)
  await expect(page.getByAltText('Threads logo')).toBeHidden()
}

export const profileThreads = (page: Page) =>
  page.locator('main > div > article')

export const quotedPosts = (page: Page) =>
  page.locator('main article article article')

export const dialog = (page: Page) => page.getByRole('dialog')

export async function clickBackdrop(page: Page) {
  const viewport = page.viewportSize()
  if (viewport === null) throw new Error('The page has no viewport')
  const CORNER_OFFSET_PX = 5
  await page.mouse.click(
    viewport.width - CORNER_OFFSET_PX,
    viewport.height - CORNER_OFFSET_PX
  )
}
