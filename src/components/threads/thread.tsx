import { $, component$, useContext, useSignal } from '@builder.io/qwik'
import { Image } from '@unpic/qwik'
import dayjs from 'dayjs'
import ImageItem from '~/components/threads/image-item'
import VideoItem from '~/components/threads/video-item'
import QuotedItem from '~/components/threads/quoted-item'
import CarouselItem from '~/components/threads/carousel-item'
import Buttons from '~/components/threads/buttons'
import Stats from '~/components/threads/stats'
import Facepiles from '~/components/threads/facepiles'
import NestedFacepiles from '~/components/threads/nested-facepiles'
import VerifyIcon from '~/components/icons/verify-icon'
import BunIcon from '~/components/icons/bun-icon'
import { UserContext } from '~/lib/context'
import formatDate from '~/lib/utils/formatDate'
import getThreadType from '~/lib/utils/getThreadType'
import formatLinks from '~/lib/utils/formatLinks'
import type { ThreadItem } from '~/lib/interfaces/threads'

interface Props {
  thread: ThreadItem
  nestedItem: boolean
  multipleItems: boolean
}

export default component$(({ thread, nestedItem, multipleItems }: Props) => {
  const { userData: user } = useContext(UserContext)
  const activeDropdown = useSignal('')

  const { isCarouselPost, isQuotedPost, isImagePost, isVideoPost } =
    getThreadType(thread)

  const formattedCaption = thread.post.caption
    ? formatLinks(thread.post.caption.text)
    : ''

  const handleDropdownClick = $((postId: string) => {
    if (activeDropdown.value.length) {
      activeDropdown.value = ''
    } else {
      activeDropdown.value = postId
    }
  })

  return (
    <article key={thread.post.id}>
      <div class='flex w-full gap-3'>
        <div class='flex flex-col items-center gap-2'>
          <Image
            class='rounded-full'
            src={user.profile_pic_url}
            layout='constrained'
            width={36}
            height={36}
            alt={`${thread.post.user.username}'s profile picture`}
          />
          <div class='relative flex h-full w-full flex-col items-center'>
            <div
              class='w-[2px] bg-[#333638]'
              style={{
                height:
                  !nestedItem && multipleItems ? 'calc(100% - 26px)' : '100%'
              }}
            />
            {!nestedItem && multipleItems && (
              <BunIcon classes='stroke-[#333638] absolute bottom-[1px] right-[15px]' />
            )}
          </div>
        </div>
        <div class={`w-full ${isCarouselPost && 'overflow-hidden'}`}>
          <header class='-mt-[5px] mb-1 flex items-center justify-between'>
            <div class='flex items-center gap-1'>
              <span class='font-semibold text-threads-white'>
                {thread.post.user.username}
              </span>
              {thread.post.user.is_verified && (
                <VerifyIcon classes='w-[16px] h-[16px] pt-[2px]' />
              )}
            </div>
            <div class='flex items-center gap-3'>
              <span
                class='text-threads-light-gray'
                title={dayjs
                  .unix(thread.post.taken_at)
                  .format('MMM DD, YYYY, h:mm A')}
              >
                {formatDate(thread.post.taken_at)}
              </span>
              <div class='relative'>
                <button
                  class='group relative flex items-center justify-center transition-transform duration-300 ease-in-out active:scale-90'
                  aria-label='More'
                  onClick$={() => handleDropdownClick(thread.post.id)}
                >
                  <div class='absolute h-[150%] w-[150%] scale-0 rounded-full bg-threads-dark-gray transition-transform duration-300 ease-in-out xl:group-hover:scale-100' />
                  <svg class='z-10 w-5 fill-threads-white' viewBox='0 0 24 24'>
                    <circle cx='12' cy='12' r='1.5' />
                    <circle cx='6' cy='12' r='1.5' />
                    <circle cx='18' cy='12' r='1.5' />
                  </svg>
                </button>
                <ul
                  class={`absolute right-0 top-full z-10 mt-2 w-full min-w-[140px] origin-top-right rounded-2xl border border-threads-white/10 bg-[#181818] px-4 py-3 transition-transform duration-300 ease-in-out ${
                    activeDropdown.value === thread.post.id
                      ? 'scale-100'
                      : 'scale-0'
                  }`}
                >
                  <li>
                    <a
                      class='block text-red-600'
                      href={`https://help.instagram.com/contact/778323897161220?inputPosterUsername=${thread.post.user.username}&content_id=${thread.post.pk}`}
                      target='_blank'
                      rel='nofollow noreferrer'
                    >
                      Report
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </header>
          {thread.post.caption && (
            <p
              class='blue-links mb-2 text-threads-white'
              dangerouslySetInnerHTML={formattedCaption}
            />
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
            <CarouselItem sliderParam={{ slidesPerView: 4, spaceBetween: 24 }}>
              {thread.post.carousel_media?.map((media) => {
                const { isImagePost, isVideoPost } = getThreadType(media)

                if (isVideoPost) {
                  return (
                    <VideoItem
                      key={media.id}
                      videoUrl={media.video_versions[0].url}
                    />
                  )
                }

                if (isImagePost) {
                  return (
                    <ImageItem
                      key={media.id}
                      imageUrl={media.image_versions2.candidates[0].url}
                      username={thread.post.user.username}
                    />
                  )
                }

                return null
              })}
            </CarouselItem>
          )}

          <Buttons />
          {!nestedItem && multipleItems && (
            <div class='mb-2 mt-3 flex items-center gap-3'>
              <NestedFacepiles
                facepiles={thread.reply_facepile_users}
                username={thread.post.user.username}
              />
              <Stats
                repliesCount={thread.view_replies_cta_string}
                likesCount={thread.post.like_count}
              />
            </div>
          )}
        </div>
      </div>
      {(nestedItem || !multipleItems) && (
        <footer class='mt-2 flex items-center gap-2'>
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
