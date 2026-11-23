import { component$, useComputed$ } from '@builder.io/qwik'
import { Image } from '@unpic/qwik'
import { Link } from '@builder.io/qwik-city'
import { CarouselItem } from '~/components/threads/CarouselItem'
import VerifyIcon from '~/components/icons/verify-icon'
import formatDate from '~/lib/utils/formatDate'
import { uploadMedia } from '~/lib/utils/uploadMedia'
import { MEDIA_TYPES } from '~/lib/constants'
import type { QuotedPost } from '~/lib/interfaces/threads'

interface Props {
  thread: QuotedPost | null
}

export default component$(({ thread }: Props) => {
  if (thread === null) return null

  const avatar = useComputed$(async () => {
    return await uploadMedia({
      mediaUrl: thread.user.profile_pic_url,
      type: MEDIA_TYPES.AVATAR
    })
  })

  return (
    <article
      key={thread.id}
      class='rounded-lg border border-threads-white/10 p-4'
    >
      <div class='mb-1 flex gap-3'>
        <Image
          class='rounded-full'
          src={avatar.value?.url}
          layout='constrained'
          width={22}
          height={22}
          alt={`${thread.user.username}'s profile picture`}
          loading='lazy'
        />
        <div class='-mt-1 flex w-full items-center justify-between'>
          <div class='flex items-center gap-1'>
            <span class='font-semibold text-threads-white'>
              {thread.user.username}
            </span>
            {thread.user.is_verified && (
              <VerifyIcon classes='w-[16px] h-[16px] pt-[2px]' />
            )}
          </div>
          <span class='text-threads-light-gray'>
            {formatDate(thread.taken_at)}
          </span>
        </div>
      </div>
      {thread.caption && (
        <p class='mb-2 text-threads-white'>{thread.caption.text}</p>
      )}
      <CarouselItem
        images={thread.carousel_media}
        imagesCount={thread.carousel_media_count}
        username={thread.user.username}
      />
      <div class='mt-2 flex items-center gap-3'>
        <div class='flex gap-[6px] text-threads-light-gray'>
          <Link href='#' class='xl:hover:underline'>
            {thread.text_post_app_info.direct_reply_count} replies
          </Link>
          <span>·</span>
          <span>{thread.like_count} likes</span>
        </div>
      </div>
    </article>
  )
})
