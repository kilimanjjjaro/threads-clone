import { uploadMedia } from '~/lib/utils/uploadMedia'
import { MEDIA_TYPES } from '~/lib/constants'
import type { ReplyFacepileUser } from '~/lib/interfaces/threads'

const LARGE_AVATAR = 20
const MEDIUM_AVATAR = 16
const SMALL_AVATAR = 12
export const SINGLE_AVATAR = 36

export const FIRST_AVATAR = 0
export const ONE_FACEPILE = 1
export const TWO_FACEPILES = 2
export const THREE_FACEPILES = 3

// Position and size of each avatar when a thread shows two or three of them.
export const PAIR_LAYOUT = [
  { position: 'left-0 top-[2px]', size: MEDIUM_AVATAR },
  {
    position: 'left-[12px] top-0 border-[2.5px] border-threads-black',
    size: LARGE_AVATAR
  }
]

export const TRIO_LAYOUT = [
  { position: 'right-0 top-0', size: LARGE_AVATAR },
  { position: 'left-0 top-[7px]', size: MEDIUM_AVATAR },
  { position: 'bottom-0 left-[13px]', size: SMALL_AVATAR }
]

export async function uploadFacepiles(facepiles: ReplyFacepileUser[]) {
  const avatars = await Promise.all(
    facepiles.map(
      async ({ profile_pic_url: mediaUrl }) =>
        await uploadMedia({ mediaUrl, type: MEDIA_TYPES.AVATAR })
    )
  )

  return avatars.filter((avatar) => avatar !== undefined)
}
