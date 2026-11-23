import { readFileSync } from 'node:fs'
import threadsJson from '../fixtures/threads-response.json'
import userJson from '../fixtures/user-response.json'
import type {
  ThreadInterface,
  UserThreadsInterface
} from '~/lib/interfaces/threads'
import type { UserDataInterface } from '~/lib/interfaces/users'

export const PROFILE_HTML = readFileSync(
  new URL('../fixtures/profile-page.html', import.meta.url),
  'utf8'
)

const USER_RESPONSE: UserDataInterface = userJson
const THREADS_RESPONSE: UserThreadsInterface = threadsJson

export const rawUserResponse = (): unknown => structuredClone(userJson)
export const rawThreadsResponse = (): unknown => structuredClone(threadsJson)

export const userResponse = () => structuredClone(USER_RESPONSE)
export const threadsResponse = () => structuredClone(THREADS_RESPONSE)

function withData<T>(data: T | undefined): T {
  if (data === undefined) throw new Error('The fixture has no data')
  return data
}

export const fixtureUser = () => withData(userResponse().data).user
export const fixtureThreads = () =>
  withData(threadsResponse().data).mediaData.threads

enum FixtureThreadIndex {
  text = 0,
  image = 1,
  video = 2,
  carousel = 3,
  imageWithoutCaption = 4,
  multiItem = 5
}

export type FixtureThread = keyof typeof FixtureThreadIndex

export function fixtureThread(kind: FixtureThread): ThreadInterface {
  return fixtureThreads()[FixtureThreadIndex[kind]]
}

export function fixtureItem(kind: FixtureThread) {
  const {
    thread_items: [item]
  } = fixtureThread(kind)
  return item
}

const NO_REPLIES = 0

export function quotedItem() {
  const item = fixtureItem('text')
  const { post: quoted } = fixtureItem('image')
  item.post.text_post_app_info.share_info.quoted_post = {
    ...quoted,
    text_post_app_info: {
      is_post_unavailable: false,
      share_info: { quoted_post: null },
      direct_reply_count: NO_REPLIES,
      link_preview_attachment: null
    }
  }
  return item
}
