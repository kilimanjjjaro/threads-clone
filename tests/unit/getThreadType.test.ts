import { describe, expect, it } from 'vitest'
import getThreadType from '~/lib/utils/getThreadType'
import { fixtureItem, quotedItem } from '../utils/fixtures'
import type { FixtureThread } from '../utils/fixtures'

const NONE = {
  isQuotedPost: false,
  isVideoPost: false,
  isCarouselPost: false,
  isImagePost: false
}

const POST_CASES: Array<[FixtureThread, Partial<typeof NONE>]> = [
  ['text', {}],
  ['multiItem', {}],
  ['image', { isImagePost: true }],
  ['imageWithoutCaption', { isImagePost: true }],
  ['video', { isVideoPost: true }],
  ['carousel', { isCarouselPost: true }]
]

describe('getThreadType', () => {
  it.each(POST_CASES)('detects a %s post', (kind, expected) => {
    expect(getThreadType(fixtureItem(kind))).toEqual({ ...NONE, ...expected })
  })

  it('detects a quoted post', () => {
    expect(getThreadType(quotedItem())).toEqual({
      ...NONE,
      isQuotedPost: true
    })
  })

  it('detects images and videos inside a carousel', () => {
    const media = fixtureItem('carousel').post.carousel_media ?? []

    expect(media.map((item) => getThreadType(item))).toEqual([
      { isImagePost: true, isVideoPost: false },
      { isImagePost: true, isVideoPost: false },
      { isImagePost: false, isVideoPost: true }
    ])
  })
})
