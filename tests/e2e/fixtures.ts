import { readFileSync } from 'node:fs'
import { test as base, expect } from '@playwright/test'
import type { Route } from '@playwright/test'
import {
  CLOUDINARY_UPLOAD_API,
  MEDIA_HOSTS,
  PLACEHOLDER_IMAGE,
  PLACEHOLDER_VIDEO,
  UPLOADED_HEIGHT,
  UPLOADED_WIDTH,
  VIDEO_URL
} from '../constants/e2e'
import type { BrowserError } from '../types/browser'

const image = readFileSync(PLACEHOLDER_IMAGE)
const video = readFileSync(PLACEHOLDER_VIDEO)

async function fulfillMedia(route: Route) {
  const isVideo = VIDEO_URL.test(new URL(route.request().url()).pathname)
  await route.fulfill(
    isVideo
      ? { contentType: 'video/webm', body: video }
      : { contentType: 'image/webp', body: image }
  )
}

export const test = base.extend<{ browserErrors: BrowserError[] }>({
  browserErrors: [
    async ({ page }, use) => {
      const errors: BrowserError[] = []

      page.on('console', (message) => {
        if (message.type() !== 'error') return
        errors.push({ text: message.text(), url: message.location().url })
      })

      page.on('pageerror', (error) => {
        errors.push({ text: `Uncaught: ${error.message}`, url: '' })
      })

      await Promise.all(
        MEDIA_HOSTS.map(async (host) => {
          await page.route(host, fulfillMedia)
        })
      )

      const uploads: string[] = []
      await page.route(CLOUDINARY_UPLOAD_API, async (route) => {
        uploads.push(route.request().url())
        await route.fulfill({
          json: {
            public_id: `threads-clone/mock-${uploads.length}`,
            width: UPLOADED_WIDTH,
            height: UPLOADED_HEIGHT
          }
        })
      })

      await use(errors)
    },
    { auto: true }
  ]
})

export { expect }
