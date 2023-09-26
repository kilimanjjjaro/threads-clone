import { CarouselMedia, ThreadItem } from '~/lib/interfaces/threads'

interface CombinedInterface
  extends Partial<CarouselMedia>,
    Partial<ThreadItem> {}

export default function getThreadType(thread: CombinedInterface) {
  if (!thread.post) {
    const isVideoPost = thread.video_versions?.length ? true : false

    const isImagePost =
      thread.image_versions2?.candidates.length && !isVideoPost ? true : false

    return {
      isVideoPost,
      isImagePost
    }
  }

  const isQuotedPost =
    thread.post.text_post_app_info.share_info.quoted_post !== null

  const isVideoPost = thread.post.video_versions?.length ? true : false

  const isCarouselPost = thread.post.carousel_media?.length ? true : false

  const isImagePost =
    thread.post.image_versions2.candidates.length &&
    !isCarouselPost &&
    !isVideoPost
      ? true
      : false

  return {
    isQuotedPost,
    isVideoPost,
    isCarouselPost,
    isImagePost
  }
}
