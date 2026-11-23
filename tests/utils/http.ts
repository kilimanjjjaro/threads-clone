import { vi } from 'vitest'
import { ENDPOINTS_DOCUMENT_ID } from '~/lib/constants'
import {
  CLOUDINARY_API,
  PROFILE_URL_PREFIX,
  THREADS_ENDPOINT,
  UPLOADED_HEIGHT,
  UPLOADED_PUBLIC_ID,
  UPLOADED_WIDTH
} from '../constants/unit'
import { PROFILE_HTML, threadsResponse, userResponse } from './fixtures'

type Handler = (url: string, init?: RequestInit) => Response
type FetchInput = string | URL | Request

export const networkError = () => new TypeError('fetch failed')

export const jsonResponse = (body: unknown) =>
  new Response(JSON.stringify(body), {
    headers: { 'content-type': 'application/json' }
  })

export const htmlResponse = (body: string) =>
  new Response(body, { headers: { 'content-type': 'text/html' } })

export function requestUrl(input: FetchInput) {
  if (typeof input === 'string') return input
  return input instanceof URL ? input.href : input.url
}

export function stubFetch(handler: Handler) {
  // The handler runs inside the promise so a thrown error rejects, like fetch.
  const fetchMock = vi.fn(
    async (input: FetchInput, init?: RequestInit) =>
      await Promise.resolve().then(() => handler(requestUrl(input), init))
  )
  vi.stubGlobal('fetch', fetchMock)
  return fetchMock
}

export function findRequest(
  fetchMock: ReturnType<typeof stubFetch>,
  matches: (url: string) => boolean
) {
  const call = fetchMock.mock.calls.find(([input]) =>
    matches(requestUrl(input))
  )
  if (call === undefined) return undefined
  const [, init] = call
  return init
}

function bodyText(init?: RequestInit) {
  return typeof init?.body === 'string' ? init.body : ''
}

export function formBody(init?: RequestInit) {
  return new URLSearchParams(bodyText(init))
}

export function jsonBody(init?: RequestInit): unknown {
  return JSON.parse(bodyText(init))
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
      const documentId = formBody(init).get('doc_id')
      if (documentId === String(ENDPOINTS_DOCUMENT_ID.USER_PROFILE))
        return reply(user, jsonResponse)
      if (documentId === String(ENDPOINTS_DOCUMENT_ID.USER_PROFILE_THREADS))
        return reply(threads, jsonResponse)
    }

    if (url.startsWith(CLOUDINARY_API)) return reply(upload, jsonResponse)

    throw new Error(`Unexpected request to ${url}`)
  }
}
