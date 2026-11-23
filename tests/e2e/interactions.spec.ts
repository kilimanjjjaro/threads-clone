import type { Page } from '@playwright/test'
import { test, expect } from './fixtures'
import {
  BIOGRAPHY,
  CAROUSEL_SLIDES,
  FACEPILE_AVATARS,
  FOLLOWERS_LABEL,
  FULL_NAME,
  NO_ELEMENTS,
  NO_WIDTH,
  PROFILE_THREADS,
  QUOTED_POSTS,
  SINGLE_ELEMENT,
  TRIO_SIZES,
  USERNAME
} from '../constants/e2e'
import {
  clickBackdrop,
  dialog,
  gridColumnWidth,
  isPlaying,
  maxWidths,
  serviceWorkerCount,
  openPage,
  profileThreads,
  quotedPosts
} from '../utils/browser'
import { unexpectedErrors } from '../utils/errors'

const PROFILE_PATH = `/@${USERNAME}/`

test.describe('login form', () => {
  test.beforeEach(async ({ page }) => {
    await openPage(page, '/')
  })

  test('focuses the username field', async ({ page }) => {
    await expect(page.getByPlaceholder('Username')).toBeFocused()
  })

  test('does not submit without a username', async ({ page }) => {
    await page.getByRole('button', { name: 'Log in' }).click()

    await expect(page).toHaveURL('/')
    await expect(
      page.getByRole('heading', { name: 'Log in with username' })
    ).toBeVisible()
  })

  test('opens the profile of the entered username', async ({
    page,
    browserErrors
  }) => {
    await page.getByPlaceholder('Username').fill(USERNAME)
    await page.getByRole('button', { name: 'Log in' }).click()

    await expect(page).toHaveURL(PROFILE_PATH)
    await expect(page.getByRole('heading', { name: FULL_NAME })).toBeVisible()
    expect(unexpectedErrors(browserErrors)).toEqual([])
  })
})

test.describe('profile', () => {
  test.beforeEach(async ({ page }) => {
    await openPage(page, PROFILE_PATH)
  })

  test('shows the user header', async ({ page }) => {
    const header = page.locator('main').locator('..').locator('header').first()

    await expect(header.getByRole('heading', { name: FULL_NAME })).toBeVisible()
    await expect(header.getByText(USERNAME, { exact: true })).toBeVisible()
    await expect(header.getByText(BIOGRAPHY)).toBeVisible()
    await expect(header.getByText(FOLLOWERS_LABEL)).toBeVisible()
    await expect(header.getByLabel('Verified')).toBeVisible()
  })

  test('lists the latest threads', async ({ page }) => {
    await expect(profileThreads(page)).toHaveCount(PROFILE_THREADS)
    await expect(
      page.getByText(`Log in to see more from ${USERNAME}.`)
    ).toBeVisible()
  })

  test('shows the avatars of who replied', async ({ page }) => {
    const facepiles = page.getByAltText(`${USERNAME}'s facepile avatar`)
    const trio = profileThreads(page)
      .first()
      .getByAltText(`${USERNAME}'s facepile avatar`)

    await expect(facepiles).toHaveCount(FACEPILE_AVATARS)
    await expect(trio).toHaveCount(TRIO_SIZES.length)
    expect(await maxWidths(trio)).toEqual(TRIO_SIZES)
  })

  test('links mentions in captions to their profile', async ({ page }) => {
    await expect(
      page.getByRole('link', { name: '@Muse', exact: true }).first()
    ).toHaveAttribute('href', '/@Muse')
  })

  test('renders every slide of a carousel', async ({ page }) => {
    await expect(page.locator('.slider-wrapper > div')).toHaveCount(
      CAROUSEL_SLIDES
    )
  })

  test('sizes the carousel slides to the slider width', async ({ page }) => {
    const slider = page.locator('.slider-wrapper').first()

    await slider.scrollIntoViewIfNeeded()

    await expect
      .poll(async () => await slider.evaluate(gridColumnWidth))
      .toBeGreaterThan(NO_WIDTH)
  })

  test('plays a video while it is on screen', async ({ page }) => {
    const video = profileThreads(page).first().locator('video')

    await video.scrollIntoViewIfNeeded()
    await expect.poll(async () => await video.evaluate(isPlaying)).toBe(true)
  })

  test('toggles the sound of a video', async ({ page }) => {
    const videoThread = profileThreads(page).first()
    const video = videoThread.locator('video')

    await expect(videoThread.getByLabel('Audio is playing')).toBeVisible()
    await videoThread.locator('video + button').click()

    await expect(videoThread.getByLabel('Audo is muted')).toBeVisible()
    expect(
      await video.evaluate((element: HTMLVideoElement) => element.muted)
    ).toBe(false)
  })

  test('shows quoted posts', async ({ page }) => {
    await expect(quotedPosts(page)).toHaveCount(QUOTED_POSTS)
    await expect(quotedPosts(page).first().getByText('3 replies')).toBeVisible()
  })

  const QUOTED_CAROUSELS = [
    {
      name: 'with carousel_media_count',
      pick: (page: Page) => quotedPosts(page).first()
    },
    {
      name: 'without carousel_media_count',
      pick: (page: Page) => quotedPosts(page).last()
    }
  ]

  for (const { name, pick } of QUOTED_CAROUSELS) {
    test(`shows the media of a quoted carousel ${name}`, async ({
      page,
      browserErrors
    }) => {
      const quoted = pick(page)

      await quoted.scrollIntoViewIfNeeded()
      await expect(quoted.locator('.swiper')).toHaveCount(SINGLE_ELEMENT)
      await expect(quoted.locator('.swiper-slide')).toHaveCount(CAROUSEL_SLIDES)
      await expect(quoted.locator('.swiper-slide').first()).toBeVisible()
      expect(unexpectedErrors(browserErrors)).toEqual([])
    })
  }

  test('opens the more menu', async ({ page }) => {
    const report = page.getByRole('link', { name: 'Report' }).first()

    await expect(report).toBeHidden()
    await page.getByRole('button', { name: 'More' }).first().click()
    await expect(report).toBeVisible()
  })
})

test.describe('modals', () => {
  test('the fediverse modal explains the full username', async ({
    page,
    browserErrors
  }) => {
    await openPage(page, PROFILE_PATH)

    await page.getByRole('button', { name: 'threads.net' }).click()
    await expect(dialog(page)).toContainText(`@${USERNAME}@threads.net`)

    await page.getByRole('button', { name: 'Close' }).click()
    await expect(dialog(page)).toHaveCount(NO_ELEMENTS)
    expect(unexpectedErrors(browserErrors)).toEqual([])
  })

  test('the avatar opens in a modal', async ({ page }) => {
    await openPage(page, PROFILE_PATH)
    const avatarName = `${USERNAME}'s profile picture`

    await page.getByRole('button', { name: avatarName }).click()
    await expect(dialog(page).getByAltText(avatarName)).toBeVisible()

    await clickBackdrop(page)
    await expect(dialog(page)).toHaveCount(NO_ELEMENTS)
  })

  test('report a problem shows the demo notice', async ({ page }) => {
    await openPage(page, '/')

    await page.getByRole('button', { name: 'Report a problem' }).click()
    await expect(
      dialog(page).getByRole('heading', { name: 'Report a problem' })
    ).toBeVisible()

    await dialog(page).getByRole('textbox').fill('Something is broken')
    await dialog(page).getByRole('button', { name: 'Send' }).click()
    await expect(dialog(page).getByRole('button')).toHaveText('Sending...')
    await expect(dialog(page).getByRole('button')).toHaveText('This is a demo!')
  })

  test('the qr code opens the get the app modal', async ({
    page,
    isMobile
  }) => {
    test.skip(isMobile, 'The qr code is only shown on large screens')
    await openPage(page, '/')

    await page.getByLabel('Download app').click()
    await expect(dialog(page).getByText('Get the app')).toBeVisible()
  })
})

test.describe('navigation', () => {
  test('the logo goes back home', async ({ page }) => {
    await openPage(page, PROFILE_PATH)

    await page.getByRole('button', { name: 'Change theme color' }).click()
    await expect(page).toHaveURL('/')
  })

  test('try again leaves the user not found page', async ({ page }) => {
    await openPage(page, '/@nobody-here/')

    await page.getByRole('button', { name: 'Try again' }).click()
    await expect(page).toHaveURL('/')
  })
})

test('does not register a service worker', async ({ page }) => {
  await openPage(page, PROFILE_PATH)

  expect(await page.evaluate(serviceWorkerCount)).toBe(NO_ELEMENTS)
})
