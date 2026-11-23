import { vi } from 'vitest'
import { ENDPOINTS_DOCUMENT_ID, THREADS_ENDPOINT } from '~/lib/constants'
import {
  CLOUDINARY_API,
  UPLOADED_HEIGHT,
  UPLOADED_PUBLIC_ID,
  UPLOADED_WIDTH
} from '../constants/unit'
import { PROFILE_HTML, threadsResponse, userResponse } from './fixtures'

type Handler = (url: string, init?: RequestInit) => Response

export const PROFILE_URL_PREFIX = 'https://www.threads.net/@'

export const networkError = () => new TypeError('fetch failed')

export const jsonResponse = (body: unknown) =>
  new Response(JSON.stringify(body), {
    headers: { 'content-type': 'application/json' }
  })

export const htmlResponse = (body: string) =>
  new Response(body, { headers: { 'content-type': 'text/html' } })

export function stubFetch(handler: Handler) {
  const fetchMock = vi.fn(
    async (input: string | URL | Request, init?: RequestInit) =>
      handler(input instanceof Request ? input.url : String(input), init)
  )
  vi.stubGlobal('fetch', fetchMock)
  return fetchMock
}

export function formBody(init?: RequestInit) {
  return new URLSearchParams(String(init?.body))
}

export function jsonBody(init?: RequestInit): Record<string, unknown> {
  return JSON.parse(String(init?.body)) as Record<string, unknown>
}

type Reply<T> = T | Error

interface ThreadsApi {
  profileHtml?: Reply<string>
  user?: Reply<unknown>
  threads?: Reply<unknown>
  upload?: Reply<unknown>
}

function reply<T>(value: Reply<T>, toResponse: (value: T) => Response) {
  if (value instanceof Error) throw value
  return toResponse(value)
}

export function threadsApi({
  profileHtml = PROFILE_HTML,
  user = userResponse(),
  threads = threadsResponse(),
  upload = {
    public_id: UPLOADED_PUBLIC_ID,
    width: UPLOADED_WIDTH,
    height: UPLOADED_HEIGHT
  }
}: ThreadsApi = {}): Handler {
  return (url, init) => {
    if (url.startsWith(PROFILE_URL_PREFIX))
      return reply(profileHtml, htmlResponse)

    if (url === THREADS_ENDPOINT) {
      const documentId = Number(formBody(init).get('doc_id'))
      if (documentId === ENDPOINTS_DOCUMENT_ID.USER_PROFILE)
        return reply(user, jsonResponse)
      if (documentId === ENDPOINTS_DOCUMENT_ID.USER_PROFILE_THREADS)
        return reply(threads, jsonResponse)
    }

    if (url.startsWith(CLOUDINARY_API)) return reply(upload, jsonResponse)

    throw new Error(`Unexpected request to ${url}`)
  }
}
