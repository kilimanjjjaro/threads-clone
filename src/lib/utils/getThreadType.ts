import type { CarouselMedia, ThreadItem } from '~/lib/interfaces/threads'

interface CombinedInterface
  extends Partial<CarouselMedia>, Partial<ThreadItem> {}

const NO_ITEMS = 0

function hasItems(items: unknown[] | null | undefined) {
  return items !== null && items !== undefined && items.length > NO_ITEMS
}

interface MediaType {
  isVideoPost: boolean
  isImagePost: boolean
}

interface PostType extends MediaType {
  isQuotedPost: boolean
  isCarouselPost: boolean
}

export default function getThreadType(thread: ThreadItem): PostType
export default function getThreadType(thread: CarouselMedia): MediaType
export default function getThreadType(
  thread: CombinedInterface
): MediaType | PostType {
  if (thread.post === undefined) {
    const isVideoPost = hasItems(thread.video_versions)
    const isImagePost =
      hasItems(thread.image_versions2?.candidates) && !isVideoPost

    return {
      isVideoPost,
      isImagePost
    }
  }

  const isQuotedPost =
    thread.post.text_post_app_info.share_info.quoted_post !== null
  const isVideoPost = hasItems(thread.post.video_versions)
  const isCarouselPost = hasItems(thread.post.carousel_media)
  const isImagePost =
    hasItems(thread.post.image_versions2.candidates) &&
    !isCarouselPost &&
    !isVideoPost

  return {
    isQuotedPost,
    isVideoPost,
    isCarouselPost,
    isImagePost
  }
}
