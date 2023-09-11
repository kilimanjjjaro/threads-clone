import { component$, useComputed$, useContext } from '@builder.io/qwik'
import { Image } from '@unpic/qwik'
import { Link } from '@builder.io/qwik-city'
import VerifyIcon from '~/components/icons/verify-icon'
import ImageItem from '~/components/threads/image-item'
import Buttons from '~/components/threads/buttons'
import QuotedItem from '~/components/threads/quoted-item'
import { CarouselItem } from '~/components/threads/CarouselItem'
import { UserContext } from '~/lib/context'
import formatDate from '~/lib/utils/formatDate'
import { uploadMedia } from '~/lib/utils/uploadMedia'
import type { ThreadItem } from '~/lib/interfaces/threads'
import type { CloudinaryImageInterface } from '~/lib/interfaces/general'
import BunIcon from '../icons/bun-icon'

interface Props {
  thread: ThreadItem
  nested: boolean
}

export default component$(({ thread, nested }: Props) => {
  const { userData: user } = useContext(UserContext)

  const isQuotedPost =
    thread.post.text_post_app_info.share_info.quoted_post !== null

  // const isRepostedPost =
  //   thread.post.text_post_app_info.share_info.reposted_post !== null

  // const isVideoPost = thread.post.video_versions.length ? true : false

  const isCarouselPost = thread.post.carousel_media?.length ? true : false

  const isImagePost =
    thread.post.image_versions2.candidates.length && !isCarouselPost
      ? true
      : false

  const facepileAvatarCount = useComputed$(() => {
    return thread.reply_facepile_users.length
  })

  console.log(nested)

  const facepileImages = useComputed$(async () => {
    const cloudinaryImages = thread.reply_facepile_users.map(async (image) => {
      try {
        const uploadedImage = await uploadMedia({
          mediaUrl: image.profile_pic_url,
          type: 'avatars'
        })

        return uploadedImage
      } catch (error) {
        console.error(error)
      }
    })

    const images = await Promise.all(cloudinaryImages)

    return images.filter(
      (image) => image !== undefined
    ) as CloudinaryImageInterface[]
  })

  return (
    <article key={thread.post.id}>
      <div class='flex gap-3 mb-1 w-full'>
        {!nested && (
          <div class='flex flex-col items-center gap-2'>
            <Image
              class='rounded-full'
              src={user.profile_pic_url}
              layout='constrained'
              width={36}
              height={36}
              alt={`${thread.post.user.username}'s profile picture`}
            />
            <div class='h-full relative w-full flex flex-col items-center'>
              <div
                class='w-[2px] bg-[#333638]'
                style={{
                  height: 'calc(100% - 26px)'
                }}
              />
              <BunIcon classes='stroke-[#333638] absolute bottom-[1px] right-4' />
            </div>
          </div>
        )}
        {nested && (
          <div class='flex flex-col items-center gap-2 pb-1'>
            <Image
              class='rounded-full'
              src={user.profile_pic_url}
              layout='constrained'
              width={36}
              height={36}
              alt={`${thread.post.user.username}'s profile picture`}
            />
            <div
              class='w-[2px] h-full bg-[#333638]'
              style={{
                height: 'calc(100% - 26px)'
              }}
            />
          </div>
        )}
        <div class='w-full overflow-hidden -mt-1'>
          <div class='flex justify-between items-center mb-1'>
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
          </div>
          {thread.post.caption && (
            <p class='text-threads-white mb-2'>{thread.post.caption.text}</p>
          )}
          {isImagePost && (
            <ImageItem
              imageUrl={thread.post.image_versions2.candidates[0].url}
              username={thread.post.user.username}
            />
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
        </div>
      </div>
      <div class='flex gap-3 items-center'>
        <div class='w-9 flex justify-center'>
          {facepileAvatarCount.value >= 3 && (
            <div class='relative w-[40px] h-[35px]'>
              {facepileImages.value.map((avatar, index) => (
                <Image
                  key={avatar.url}
                  class={`absolute object-cover object-center aspect-square overflow-hidden rounded-lg
                  ${index === 0 && 'top-0 right-0'}
  
                  ${index === 1 && 'top-[7px] left-0'}
  
                  ${index === 2 && 'bottom-0 left-[13px]'}
                `}
                  src={avatar.url}
                  layout='constrained'
                  width={index === 0 ? 20 : index === 1 ? 16 : 12}
                  height={index === 0 ? 20 : index === 1 ? 16 : 12}
                  alt={`${thread.post.user.username}'s facepile avatar`}
                />
              ))}
            </div>
          )}
          {facepileAvatarCount.value === 2 && (
            <div class='relative w-[32px] h-[20px]'>
              {facepileImages.value.map((avatar, index) => (
                <Image
                  key={avatar.url}
                  class={`absolute object-cover object-center aspect-square overflow-hidden rounded-lg
                  ${index === 0 && 'top-[2px] left-0'}
                  ${
                    index === 1 &&
                    'top-0 left-[12px] border-[2.5px] border-threads-black'
                  }
                `}
                  src={avatar.url}
                  layout='constrained'
                  width={index === 0 ? 16 : 20}
                  height={index === 0 ? 16 : 20}
                  alt={`${thread.post.user.username}'s facepile avatar`}
                />
              ))}
            </div>
          )}
          {facepileAvatarCount.value === 1 && (
            <div class='relative w-8 h-8'>
              <Image
                class='absolute object-cover object-center aspect-square overflow-hidden rounded-lg'
                src={facepileImages.value[0].url}
                layout='constrained'
                width={36}
                height={36}
                alt={`${thread.post.user.username}'s facepile avatar`}
              />
            </div>
          )}
        </div>
        <div class='text-threads-light-gray flex gap-[6px]'>
          <Link href='#' class='xl:hover:underline'>
            {thread.view_replies_cta_string}
          </Link>
          <span>·</span>
          <span>{thread.post.like_count} likes</span>
        </div>
      </div>
    </article>
  )
})
