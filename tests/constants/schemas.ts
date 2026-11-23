import { arrayOf, nullable } from '../utils/shape'

// Fields of the Threads GraphQL responses that the app reads.

const candidates = arrayOf({ url: 'string' })

const media = {
  id: 'string',
  image_versions2: { candidates },
  video_versions: nullable(arrayOf({ url: 'string' }))
} as const

const author = {
  username: 'string',
  is_verified: 'boolean',
  profile_pic_url: 'string'
} as const

const post = {
  ...media,
  pk: 'string',
  code: 'string',
  taken_at: 'number',
  like_count: 'number',
  caption: nullable({ text: 'string' }),
  user: author,
  carousel_media: nullable(arrayOf(media)),
  carousel_media_count: nullable('number'),
  text_post_app_info: { share_info: { quoted_post: nullable('object') } }
} as const

const threadItem = {
  post,
  reply_facepile_users: nullable(arrayOf({ profile_pic_url: 'string' })),
  view_replies_cta_string: nullable('string')
} as const

export const threadsResponseShape = {
  data: {
    mediaData: {
      threads: arrayOf({ id: 'string', thread_items: arrayOf(threadItem, 1) })
    }
  }
} as const

export const userResponseShape = {
  data: {
    user: {
      pk: 'string',
      username: 'string',
      full_name: 'string',
      biography: 'string',
      is_verified: 'boolean',
      follower_count: 'number',
      profile_pic_url: 'string',
      hd_profile_pic_versions: arrayOf({ url: 'string' }, 1),
      bio_links: arrayOf({ url: 'string' })
    }
  }
} as const
