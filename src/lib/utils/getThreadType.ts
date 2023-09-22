import { ThreadItem } from '~/lib/interfaces/threads'

export default function getThreadType(thread: ThreadItem) {
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
