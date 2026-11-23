import { readFileSync } from 'node:fs'
import { test as base, expect } from '@playwright/test'
import {
  CLOUDINARY_UPLOAD_API,
  MEDIA_HOSTS,
  PLACEHOLDER_IMAGE,
  PLACEHOLDER_VIDEO,
  VIDEO_URL
} from '../constants/e2e'
import type { BrowserError } from '../types/browser'

const image = readFileSync(PLACEHOLDER_IMAGE)
const video = readFileSync(PLACEHOLDER_VIDEO)

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

      // The pages render media hosted on Cloudinary and the Threads CDN, and
      // some components upload media from the browser. Keep it all offline.
      for (const host of MEDIA_HOSTS) {
        await page.route(host, (route) =>
          VIDEO_URL.test(new URL(route.request().url()).pathname)
            ? route.fulfill({ contentType: 'video/webm', body: video })
            : route.fulfill({ contentType: 'image/webp', body: image })
        )
      }
      await page.route(CLOUDINARY_UPLOAD_API, (route) =>
        route.fulfill({
          json: { public_id: 'threads-clone/mock', width: 1280, height: 720 }
        })
      )

      await use(errors)
    },
    { auto: true }
  ]
})

export { expect }
