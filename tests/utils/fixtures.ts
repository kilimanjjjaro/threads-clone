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

export const rawUserResponse = (): unknown => structuredClone(userJson)
export const rawThreadsResponse = (): unknown => structuredClone(threadsJson)

export const userResponse = () => rawUserResponse() as UserDataInterface
export const threadsResponse = () =>
  rawThreadsResponse() as UserThreadsInterface

const FIXTURE_THREAD_INDEX = {
  text: 0,
  image: 1,
  video: 2,
  carousel: 3,
  imageWithoutCaption: 4,
  multiItem: 5
} as const

export type FixtureThread = keyof typeof FIXTURE_THREAD_INDEX

export function fixtureThread(kind: FixtureThread): ThreadInterface {
  return threadsResponse().data.mediaData.threads[FIXTURE_THREAD_INDEX[kind]]
}

export function fixtureItem(kind: FixtureThread) {
  return fixtureThread(kind).thread_items[0]
}

export function quotedItem() {
  const item = fixtureItem('text')
  const quoted = fixtureItem('image').post
  item.post.text_post_app_info.share_info.quoted_post = {
    ...quoted,
    text_post_app_info: {
      is_post_unavailable: false,
      share_info: { quoted_post: null },
      direct_reply_count: 0,
      link_preview_attachment: null
    }
  }
  return item
}
