export const E2E_PORT = 4310
export const E2E_BASE_URL = `http://localhost:${E2E_PORT}`
export const MOCK_PORT = 4311
export const MOCK_BASE_URL = `http://localhost:${MOCK_PORT}`

const DESKTOP_VIEWPORT_WIDTH = 1440
const DESKTOP_VIEWPORT_HEIGHT = 900
export const DESKTOP_VIEWPORT = {
  width: DESKTOP_VIEWPORT_WIDTH,
  height: DESKTOP_VIEWPORT_HEIGHT
}

export const TEST_TIMEOUT_MS = 60_000
export const EXPECT_TIMEOUT_MS = 15_000
export const WEB_SERVER_TIMEOUT_MS = 180_000
export const CI_RETRIES = 1
export const LOCAL_RETRIES = 0

export const USERNAME = 'zuck'
export const FULL_NAME = 'Mark Zuckerberg'
export const BIOGRAPHY = 'Mostly superintelligence and MMA takes'
export const FOLLOWERS_LABEL = '5.8M followers'
export const UNKNOWN_USERNAME = 'nobody-here'
export const PROFILE_THREADS = 5
export const QUOTED_POSTS = 2

export const CAROUSEL_SLIDES = 3
// The mock gives the threads 3, 1, 2 and 2 reply avatars; a trio is drawn
// at 20, 16 and 12 px.
export const FACEPILE_AVATARS = 8
export const TRIO_SIZES = ['20px', '16px', '12px']

export const HTTP_STATUS_OK = 200
export const HTTP_STATUS_NOT_FOUND = 404
const HTTP_STATUS_MOVED_PERMANENTLY = 301
const HTTP_STATUS_FOUND = 302
const HTTP_STATUS_TEMPORARY_REDIRECT = 307
const HTTP_STATUS_PERMANENT_REDIRECT = 308
export const REDIRECT_STATUSES = [
  HTTP_STATUS_MOVED_PERMANENTLY,
  HTTP_STATUS_FOUND,
  HTTP_STATUS_TEMPORARY_REDIRECT,
  HTTP_STATUS_PERMANENT_REDIRECT
]
export const NO_REDIRECTS = 0
export const PAGE_CACHE_CONTROL = 'max-age=5, stale-while-revalidate=604800'

export const NO_ELEMENTS = 0
export const SINGLE_ELEMENT = 1

export const UPLOADED_WIDTH = 1280
export const UPLOADED_HEIGHT = 720

// Media hosts the browser loads from; the e2e tests serve placeholders.
export const MEDIA_HOSTS = [
  'https://res.cloudinary.com/**',
  'https://cdn.test/**'
]
export const CLOUDINARY_UPLOAD_API = 'https://api.cloudinary.com/**'
export const PLACEHOLDER_IMAGE = 'public/images/avatars/1.webp'
export const PLACEHOLDER_VIDEO = 'tests/fixtures/video.webm'
export const VIDEO_URL = /\/video\/upload\/|\.mp4$/v

export const IGNORED_ERRORS = [
  // qwik-city wraps navigations in a view transition. On the mobile project
  // the viewport resizes mid navigation and the browser aborts the animation;
  // the navigation itself completes.
  'Transition was aborted because of invalid state. Viewport size changed'
]
