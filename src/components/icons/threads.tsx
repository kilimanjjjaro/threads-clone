import { component$, useContext } from '@builder.io/qwik'
import { Image } from '@unpic/qwik'
import VerifyIcon from '~/components/icons/verify-icon'
import { UserContext } from '~/lib/context'
import formatDate from '~/lib/utils/formatDate'
import { DEFAULT_THREAD_IMAGE } from '~/lib/constants'
import { Link } from '@builder.io/qwik-city'
import LikeIcon from '../icons/like-icon'

export default component$(() => {
  const { userData: user, userThreads: threads } = useContext(UserContext)

  return (
    <div class='flex flex-col gap-3'>
      {threads.map((thread) => (
        <article
          key={thread.id}
          class='flex flex-col gap-3 pb-3 border-b border-threads-white/[0.15]'
        >
          {thread.thread_items.map((item) => (
            <div key={item.post.id}>
              <div class='flex gap-3'>
                <Image
                  class='rounded-full'
                  src={user.profile_pic_url}
                  layout='constrained'
                  width={36}
                  height={36}
                  alt={`${item.post.user.username}'s profile picture`}
                />
                <div>
                  <div class='flex justify-between items-center mb-1'>
                    <div class='flex gap-1 items-center'>
                      <span class='text-threads-white font-semibold'>
                        {user.username}
                      </span>
                      {user.is_verified && <VerifyIcon classes='w-4 h-4' />}
                    </div>
                    <div class='flex gap-3 items-center'>
                      <span class='text-threads-light-gray'>
                        {formatDate(item.post.taken_at)}
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
                  {item.post.caption && (
                    <p class='text-threads-white mb-2'>
                      {item.post.caption.text}
                    </p>
                  )}
                  <div class='flex relative aspect-square overflow-hidden border border-threads-light-gray/20 rounded-lg mb-2'>
                    <Image
                      class='w-full h-full object-cover object-center'
                      src={DEFAULT_THREAD_IMAGE}
                      layout='constrained'
                      alt={`${item.post.user.username}'s thread image`}
                      width={600}
                      aspectRatio={1}
                    />
                  </div>
                  <div class='flex gap-2'>
                    <LikeIcon classes='w-5 h-5' />
                  </div>
                </div>
              </div>
              <div class='flex gap-2 items-center'>
                <div class='relative w-[39px] h-[35px]'>
                  <Image
                    class='absolute rounded-full top-0 right-0'
                    src={DEFAULT_THREAD_IMAGE}
                    layout='constrained'
                    width={20}
                    height={20}
                    alt={`${item.post.user.username}'s profile picture`}
                  />
                  <Image
                    class='absolute rounded-full top-[7px] left-0'
                    src={DEFAULT_THREAD_IMAGE}
                    layout='constrained'
                    width={16}
                    height={16}
                    alt={`${item.post.user.username}'s profile picture`}
                  />
                  <Image
                    class='absolute rounded-full bottom-0 left-[13px]'
                    src={DEFAULT_THREAD_IMAGE}
                    layout='constrained'
                    width={12}
                    height={12}
                    alt={`${item.post.user.username}'s profile picture`}
                  />
                </div>
                <div class='text-threads-light-gray flex gap-1'>
                  <Link href='#' class='hover:underline'>
                    {item.view_replies_cta_string}
                  </Link>
                  <span>·</span>
                  <span>{item.post.like_count} likes</span>
                </div>
              </div>
            </div>
          ))}
        </article>
      ))}
    </div>
  )
})
