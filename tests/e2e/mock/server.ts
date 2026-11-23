// Stands in for the Threads and Cloudinary APIs while the e2e tests run.
// The app server reaches it through THREADS_ORIGIN and CLOUDINARY_API_ORIGIN.
import { readFileSync } from 'node:fs'
import { createServer } from 'node:http'
import type { IncomingMessage, ServerResponse } from 'node:http'

const PORT = Number(process.env.MOCK_PORT ?? 4311)
const KNOWN_USERNAME = 'zuck'
const USER_PROFILE_DOC_ID = '7608068672565545'
const USER_THREADS_DOC_ID = '6451898791498605'
const UPLOAD_PATH = /^\/v1_1\/[^\/]+\/(image|video)\/upload$/v
const UPLOADED_MEDIA = { width: 1280, height: 720 }
const QUOTED_REPLIES = 3
const QUOTED_CAROUSEL_COUNT = 3

type Json = Record<string, any>

const fixture = (name: string) =>
  readFileSync(new URL(`../../fixtures/${name}`, import.meta.url), 'utf8')

const profileHtml = fixture('profile-page.html')
const userResponse = fixture('user-response.json')
const threadsResponse = JSON.parse(fixture('threads-response.json')) as Json

const [text, image, video, carousel, , multiItem] = threadsResponse.data
  .mediaData.threads as Json[]

// A post quoting the carousel. Threads stopped sending carousel_media_count,
// so one keeps the count (renders the swiper) and the other sends null.
function quoting(outer: Json, id: string, carouselCount: number | null) {
  const thread = structuredClone(outer)
  const post = thread.thread_items[0].post
  thread.id = id
  post.id = `${id}_post`
  post.text_post_app_info.share_info.quoted_post = {
    ...structuredClone(carousel.thread_items[0].post),
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

const profileThreads = [
  video,
  carousel,
  multiItem,
  quoting(text, 'quote-with-count', QUOTED_CAROUSEL_COUNT),
  quoting(image, 'quote-without-count', null)
]

const threadsBody = JSON.stringify({
  ...threadsResponse,
  data: { mediaData: { threads: profileThreads } }
})

async function readBody(request: IncomingMessage) {
  const chunks: Buffer[] = []
  for await (const chunk of request) chunks.push(chunk as Buffer)
  return Buffer.concat(chunks).toString('utf8')
}

function send(
  response: ServerResponse,
  status: number,
  type: string,
  body: string
) {
  response.writeHead(status, { 'content-type': type })
  response.end(body)
}

const server = createServer(async (request, response) => {
  const url = new URL(request.url ?? '/', `http://localhost:${PORT}`)

  if (url.pathname === '/health') return send(response, 200, 'text/plain', 'ok')

  if (request.method === 'GET' && url.pathname.startsWith('/@')) {
    const known = url.pathname === `/@${KNOWN_USERNAME}`
    return send(
      response,
      200,
      'text/html',
      known ? profileHtml : '<html></html>'
    )
  }

  if (request.method === 'POST' && url.pathname === '/api/graphql') {
    const documentId = new URLSearchParams(await readBody(request)).get(
      'doc_id'
    )
    if (documentId === USER_PROFILE_DOC_ID)
      return send(response, 200, 'application/json', userResponse)
    if (documentId === USER_THREADS_DOC_ID)
      return send(response, 200, 'application/json', threadsBody)
  }

  const upload = UPLOAD_PATH.exec(url.pathname)
  if (request.method === 'POST' && upload !== null) {
    const { folder } = JSON.parse(await readBody(request)) as { folder: string }
    const body = { public_id: `${folder}/mock`, ...UPLOADED_MEDIA }
    return send(response, 200, 'application/json', JSON.stringify(body))
  }

  send(
    response,
    404,
    'text/plain',
    `No mock for ${request.method} ${url.pathname}`
  )
})

server.listen(PORT, () => {
  console.log(`Threads mock listening on http://localhost:${PORT}`)
})
