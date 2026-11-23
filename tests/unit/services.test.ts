import { beforeEach, describe, expect, it, vi } from 'vitest'
import { getThreads } from '~/lib/services/getThreads'
import { getUser } from '~/lib/services/getUser'
import { getUserId } from '~/lib/services/getUserId'
import { fetchData } from '~/lib/utils/fetchData'
import {
  ENDPOINTS_DOCUMENT_ID,
  THREADS_APP_ID,
  THREADS_APP_LSD,
  THREADS_ENDPOINT
} from '~/lib/constants'
import {
  CLOUDINARY_API,
  LAST_HD_AVATAR_URL,
  MAX_PROFILE_THREADS,
  USER_ID,
  USERNAME
} from '../constants/unit'
import { threadsResponse, userResponse } from '../utils/fixtures'
import {
  PROFILE_URL_PREFIX,
  formBody,
  jsonBody,
  networkError,
  stubFetch,
  threadsApi
} from '../utils/http'

vi.mock('@builder.io/qwik-city', () => ({
  server$: <T>(fn: T) => fn
}))

beforeEach(() => {
  vi.spyOn(console, 'log').mockImplementation(() => undefined)
  vi.spyOn(console, 'error').mockImplementation(() => undefined)
})

describe('getUserId', () => {
  it('reads the user id from the public profile page', async () => {
    const fetchMock = stubFetch(threadsApi())

    await expect(getUserId({ username: USERNAME })).resolves.toBe(USER_ID)

    const [url, init] = fetchMock.mock.calls[0]
    expect(url).toBe(`${PROFILE_URL_PREFIX}${USERNAME}`)
    expect(init?.headers).toEqual({ 'sec-fetch-site': 'same-site' })
  })

  it('returns undefined when the page has no user id', async () => {
    stubFetch(threadsApi({ profileHtml: '<html></html>' }))

    await expect(getUserId({ username: USERNAME })).resolves.toBeUndefined()
  })
})

describe('fetchData', () => {
  const documentId = ENDPOINTS_DOCUMENT_ID.USER_PROFILE

  it('posts the graphql query as a form', async () => {
    const fetchMock = stubFetch(threadsApi())

    await fetchData({ documentId, userId: USER_ID })

    const [url, init] = fetchMock.mock.calls[0]
    expect(url).toBe(THREADS_ENDPOINT)
    expect(init?.method).toBe('POST')
    expect(init?.headers).toMatchObject({
      'content-type': 'application/x-www-form-urlencoded',
      'x-ig-app-id': THREADS_APP_ID,
      'x-fb-lsd': THREADS_APP_LSD,
      'sec-fetch-site': 'same-site'
    })

    const body = formBody(init)
    expect(body.get('lsd')).toBe(THREADS_APP_LSD)
    expect(body.get('doc_id')).toBe(String(documentId))
    expect(JSON.parse(body.get('variables') ?? '')).toEqual({
      userID: USER_ID,
      __relay_internal__pv__BarcelonaIsSableEnabledrelayprovider: false,
      __relay_internal__pv__BarcelonaIsSuggestedUsersOnProfileEnabledrelayprovider:
        false,
      __relay_internal__pv__BarcelonaShouldShowFediverseM075Featuresrelayprovider:
        false
    })
  })

  it('returns the parsed response', async () => {
    stubFetch(threadsApi())

    await expect(fetchData({ documentId, userId: USER_ID })).resolves.toEqual(
      userResponse()
    )
  })

  it('returns undefined and logs when the request fails', async () => {
    stubFetch(threadsApi({ user: networkError() }))

    await expect(
      fetchData({ documentId, userId: USER_ID })
    ).resolves.toBeUndefined()
    expect(console.error).toHaveBeenCalled()
  })
})

describe('getUser', () => {
  it('returns null without a username', async () => {
    const fetchMock = stubFetch(threadsApi())

    await expect(getUser({})).resolves.toBeNull()
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('returns null when the profile does not exist', async () => {
    stubFetch(threadsApi({ profileHtml: '<html></html>' }))

    await expect(getUser({ username: USERNAME })).resolves.toBeNull()
  })

  it('returns the user with the avatar re-hosted on cloudinary', async () => {
    const fetchMock = stubFetch(threadsApi())

    const user = await getUser({ username: USERNAME })

    expect(user).toMatchObject({
      username: USERNAME,
      full_name: userResponse().data.user.full_name
    })
    expect(user?.profile_pic_url).toMatch(/^https:\/\/res\.cloudinary\.com\//v)

    const upload = fetchMock.mock.calls.find(([url]) =>
      String(url).startsWith(CLOUDINARY_API)
    )
    expect(jsonBody(upload?.[1])).toMatchObject({
      file: LAST_HD_AVATAR_URL,
      folder: 'threads-clone/user-avatars'
    })
  })

  it('keeps the original avatar when the upload fails', async () => {
    stubFetch(threadsApi({ upload: networkError() }))

    const user = await getUser({ username: USERNAME })

    expect(user?.profile_pic_url).toBe(userResponse().data.user.profile_pic_url)
  })

  it.fails('returns null when the profile request fails', async () => {
    stubFetch(threadsApi({ user: networkError() }))

    await expect(getUser({ username: USERNAME })).resolves.toBeNull()
  })
})

describe('getThreads', () => {
  it('returns null without a username', async () => {
    await expect(getThreads({})).resolves.toBeNull()
  })

  it('returns null when the profile does not exist', async () => {
    stubFetch(threadsApi({ profileHtml: '<html></html>' }))

    await expect(getThreads({ username: USERNAME })).resolves.toBeNull()
  })

  it('returns the first five threads of the profile', async () => {
    const fetchMock = stubFetch(threadsApi())

    const threads = await getThreads({ username: USERNAME })

    const expected = threadsResponse()
      .data.mediaData.threads.slice(0, MAX_PROFILE_THREADS)
      .map(({ id }) => id)
    expect(threads?.map(({ id }) => id)).toEqual(expected)

    const graphql = fetchMock.mock.calls.find(
      ([url]) => url === THREADS_ENDPOINT
    )
    expect(formBody(graphql?.[1]).get('doc_id')).toBe(
      String(ENDPOINTS_DOCUMENT_ID.USER_PROFILE_THREADS)
    )
  })

  it('returns undefined when the request fails', async () => {
    stubFetch(threadsApi({ threads: networkError() }))

    await expect(getThreads({ username: USERNAME })).resolves.toBeUndefined()
  })
})
