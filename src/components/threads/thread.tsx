import { component$, useContext } from '@builder.io/qwik'
import { Image } from '@unpic/qwik'
import ImageItem from '~/components/threads/image-item'
import VideoItem from '~/components/threads/video-item'
import QuotedItem from '~/components/threads/quoted-item'
import { CarouselItem } from '~/components/threads/CarouselItem'
import Buttons from '~/components/threads/buttons'
import Stats from '~/components/threads/stats'
import Facepiles from '~/components/threads/facepiles'
import NestedFacepiles from '~/components/threads/nested-facepiles'
import VerifyIcon from '~/components/icons/verify-icon'
import BunIcon from '~/components/icons/bun-icon'
import { UserContext } from '~/lib/context'
import formatDate from '~/lib/utils/formatDate'
import getThreadType from '~/lib/utils/getThreadType'
import type { ThreadItem } from '~/lib/interfaces/threads'

interface Props {
  thread: ThreadItem
  nestedItem: boolean
  multipleItems: boolean
}

export default component$(({ thread, nestedItem, multipleItems }: Props) => {
  const { userData: user } = useContext(UserContext)

  const { isCarouselPost, isQuotedPost, isImagePost, isVideoPost } =
    getThreadType(thread)

  return (
    <article key={thread.post.id}>
      <div class='flex gap-3 w-full'>
        <div class='flex flex-col items-center gap-2'>
          <Image
            class='rounded-full'
            src={user.profile_pic_url}
            layout='constrained'
            width={36}
            height={36}
            alt={`${thread.post.user.username}'s profile picture`}
          />
          <div class='relative w-full h-full flex flex-col items-center'>
            <div
              class='w-[2px] bg-[#333638]'
              style={{
                height:
                  !nestedItem && multipleItems ? 'calc(100% - 26px)' : '100%'
              }}
            />
            {!nestedItem && multipleItems && (
              <BunIcon classes='stroke-[#333638] absolute bottom-[1px] right-4' />
            )}
          </div>
        </div>
        <div class='w-full overflow-hidden'>
          <header class='flex justify-between items-center mb-1 -mt-[5px]'>
            <div class='flex gap-1 items-center'>
              <span class='text-threads-white font-semibold'>
                {thread.post.user.username}
              </span>
              {thread.post.user.is_verified && (
                <VerifyIcon classes='w-[16px] h-[16px] pt-[2px]' />
              )}
            </div>
            <div class='flex gap-3 items-center'>
              <span class='text-threads-light-gray'>
                {formatDate(thread.post.taken_at)}
              </span>
              <svg
                class='fill-threads-white w-5'
                aria-label='More'
                viewBox='0 0 24 24'
              >
                <circle cx='12' cy='12' r='1.5' />
                <circle cx='6' cy='12' r='1.5' />
                <circle cx='18' cy='12' r='1.5' />
              </svg>
            </div>
          </header>
          {thread.post.caption && (
            <p class='text-threads-white mb-2'>{thread.post.caption.text}</p>
          )}

          {isImagePost && (
            <ImageItem
              imageUrl={thread.post.image_versions2.candidates[0].url}
              username={thread.post.user.username}
            />
          )}

          {isVideoPost && (
            <VideoItem videoUrl={thread.post.video_versions[0].url} />
          )}

          {isQuotedPost && (
            <QuotedItem
              thread={thread.post.text_post_app_info.share_info.quoted_post}
            />
          )}

          {isCarouselPost && (
            <CarouselItem
              images={thread.post.carousel_media}
              imagesCount={thread.post.carousel_media_count}
              username={thread.post.user.username}
            />
          )}

          <Buttons />
          {!nestedItem && multipleItems && (
            <footer class='flex gap-3 mt-3 mb-2 items-center'>
              <NestedFacepiles
                facepiles={thread.reply_facepile_users}
                username={thread.post.user.username}
              />
              <Stats
                repliesCount={thread.view_replies_cta_string}
                likesCount={thread.post.like_count}
              />
            </footer>
          )}
        </div>
      </div>
      {(nestedItem || !multipleItems) && (
        <footer class='flex gap-3 items-center mt-2'>
          <Facepiles
            facepiles={thread.reply_facepile_users}
            username={thread.post.user.username}
          />
          <Stats
            repliesCount={thread.view_replies_cta_string}
            likesCount={thread.post.like_count}
          />
        </footer>
      )}
    </article>
  )
})
