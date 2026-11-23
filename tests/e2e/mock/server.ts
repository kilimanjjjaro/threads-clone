// Stands in for the Threads and Cloudinary APIs while the e2e tests run.
// The app server reaches it through THREADS_ORIGIN and CLOUDINARY_API_ORIGIN.
// Node runs this file directly, so it only imports types from the app.
import { readFileSync } from 'node:fs'
import { createServer } from 'node:http'
import { text as readText } from 'node:stream/consumers'
import type { IncomingMessage } from 'node:http'
import type {
  ThreadInterface,
  UserThreadsInterface
} from '../../../src/lib/interfaces/threads'

const DEFAULT_PORT = 4311
const PORT = Number(process.env.MOCK_PORT ?? DEFAULT_PORT)
const HTTP_OK = 200
const HTTP_NOT_FOUND = 404
const KNOWN_USERNAME = 'zuck'
const USER_PROFILE_DOC_ID = '7608068672565545'
const USER_THREADS_DOC_ID = '6451898791498605'
const UPLOAD_PATH = /^\/v1_1\/[^\/]+\/(?:image|video)\/upload$/v
const UPLOADED_WIDTH = 1280
const UPLOADED_HEIGHT = 720
const QUOTED_REPLIES = 3
const QUOTED_CAROUSEL_COUNT = 3
const NO_FACEPILES = 0
const ONE_FACEPILE = 1
const TWO_FACEPILES = 2
const THREE_FACEPILES = 3

interface Reply {
  status: number
  type: string
  body: string
}

const fixture = (name: string) =>
  readFileSync(new URL(`../../fixtures/${name}`, import.meta.url), 'utf8')

const profileHtml = fixture('profile-page.html')
const userResponse = fixture('user-response.json')
// eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- trimmed real response, shape checked by the contract test
const threadsResponse = JSON.parse(
  fixture('threads-response.json')
) as UserThreadsInterface

const [text, image, video, carousel, , multiItem] =
  threadsResponse.data?.mediaData.threads ?? []

// A post quoting the carousel. Threads stopped sending carousel_media_count,
// so one keeps the count and the other sends null, as the api does now.
function quoting(
  outer: ThreadInterface,
  id: string,
  carouselCount: number | null
) {
  const thread = structuredClone(outer)
  const {
    thread_items: [{ post }]
  } = thread
  const {
    thread_items: [{ post: quoted }]
  } = structuredClone(carousel)

  thread.id = id
  post.id = `${id}_post`
  post.text_post_app_info.share_info.quoted_post = {
    ...quoted,
    carousel_media_count: carouselCount,
    text_post_app_info: {
      is_post_unavailable: false,
      share_info: { quoted_post: null },
      direct_reply_count: QUOTED_REPLIES,
      link_preview_attachment: null
    }
  }
  return thread
}

// The real fixtures have no reply avatars; give each thread item some.
function withFacepiles(outer: ThreadInterface, ...counts: number[]) {
  const thread = structuredClone(outer)
  thread.thread_items = thread.thread_items.map((item, itemIndex) => ({
    ...item,
    reply_facepile_users: Array.from(
      { length: counts.at(itemIndex) ?? NO_FACEPILES },
      (_, userIndex) => ({
        __typename: 'XDTUserDict',
        id: null,
        profile_pic_url: `https://cdn.test/media/facepile-${thread.id}-${itemIndex}-${userIndex}.jpg`
      })
    )
  }))
  return thread
}

const threadsBody = JSON.stringify({
  ...threadsResponse,
  data: {
    mediaData: {
      threads: [
        withFacepiles(video, THREE_FACEPILES),
        withFacepiles(carousel, ONE_FACEPILE),
        withFacepiles(multiItem, TWO_FACEPILES, TWO_FACEPILES),
        quoting(text, 'quote-with-count', QUOTED_CAROUSEL_COUNT),
        quoting(image, 'quote-without-count', null)
      ]
    }
  }
})

const json = (body: string): Reply => ({
  status: HTTP_OK,
  type: 'application/json',
  body
})

function profilePage(url: URL): Reply {
  const known = url.pathname === `/@${KNOWN_USERNAME}`
  return {
    status: HTTP_OK,
    type: 'text/html',
    body: known ? profileHtml : '<html></html>'
  }
}

async function graphql(request: IncomingMessage) {
  const documentId = new URLSearchParams(await readText(request)).get('doc_id')
  if (documentId === USER_PROFILE_DOC_ID) return json(userResponse)
  if (documentId === USER_THREADS_DOC_ID) return json(threadsBody)
  return undefined
}

const uploads: string[] = []

async function upload(request: IncomingMessage) {
  const payload: unknown = JSON.parse(await readText(request))
  const folder =
    typeof payload === 'object' &&
    payload !== null &&
    'folder' in payload &&
    typeof payload.folder === 'string'
      ? payload.folder
      : 'threads-clone'
  // Each upload gets its own public id, as on Cloudinary.
  uploads.push(folder)
  return json(
    JSON.stringify({
      public_id: `${folder}/mock-${uploads.length}`,
      width: UPLOADED_WIDTH,
      height: UPLOADED_HEIGHT
    })
  )
}

async function route(request: IncomingMessage, url: URL) {
  const { method } = request
  const { pathname } = url

  if (pathname === '/health')
    return { status: HTTP_OK, type: 'text/plain', body: 'ok' }
  if (method === 'GET' && pathname.startsWith('/@')) return profilePage(url)
  if (method === 'POST' && pathname === '/api/graphql')
    return await graphql(request)
  if (method === 'POST' && UPLOAD_PATH.test(pathname))
    return await upload(request)
  return undefined
}

const server = createServer((request, response) => {
  const url = new URL(request.url ?? '/', `http://localhost:${PORT}`)

  void route(request, url).then((reply) => {
    const { status, type, body } = reply ?? {
      status: HTTP_NOT_FOUND,
      type: 'text/plain',
      body: `No mock for ${request.method} ${url.pathname}`
    }
    response.writeHead(status, { 'content-type': type })
    response.end(body)
  })
})

server.listen(PORT, () => {
  console.log(`Threads mock listening on http://localhost:${PORT}`)
})
