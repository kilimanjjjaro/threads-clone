import { expect } from '@playwright/test'
import type { Locator, Page } from '@playwright/test'

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

export async function maxWidths(locator: Locator) {
  return await locator.evaluateAll((elements) =>
    elements.map((element) =>
      element instanceof HTMLElement ? element.style.maxWidth : ''
    )
  )
}
