import { component$ } from '@builder.io/qwik'
import ImageItem from '~/components/threads/image-item'
import VideoItem from '~/components/threads/video-item'
import QuotedItem from '~/components/threads/quoted-item'
import CarouselItem from '~/components/threads/carousel-item'
import getThreadType from '~/lib/utils/getThreadType'
import { imageUrl, videoUrl } from '~/lib/utils/mediaUrls'
import type { ThreadItem } from '~/lib/interfaces/threads'

const SLIDES_PER_VIEW = 4
const SLIDES_GAP_PX = 24

interface Props {
  thread: ThreadItem
}

export default component$(({ thread }: Props) => {
  const { post } = thread
  const { isCarouselPost, isQuotedPost, isImagePost, isVideoPost } =
    getThreadType(thread)

  return (
    <>
      {isImagePost && (
        <ImageItem imageUrl={imageUrl(post)} username={post.user.username} />
      )}

      {isVideoPost && <VideoItem videoUrl={videoUrl(post)} />}

      {isQuotedPost && (
        <QuotedItem thread={post.text_post_app_info.share_info.quoted_post} />
      )}

      {isCarouselPost && (
        <CarouselItem
          sliderParam={{
            slidesPerView: SLIDES_PER_VIEW,
            spaceBetween: SLIDES_GAP_PX
          }}
        >
          {post.carousel_media?.map((media) => {
            const { isImagePost: isImage, isVideoPost: isVideo } =
              getThreadType(media)

            if (isVideo)
              return <VideoItem key={media.id} videoUrl={videoUrl(media)} />

            if (isImage)
              return (
                <ImageItem
                  key={media.id}
                  imageUrl={imageUrl(media)}
                  username={post.user.username}
                />
              )

            return null
          })}
        </CarouselItem>
      )}
    </>
  )
})
