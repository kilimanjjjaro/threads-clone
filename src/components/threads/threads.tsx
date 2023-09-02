import { component$, useContext } from '@builder.io/qwik'
import { Image } from '@unpic/qwik'
import VerifyIcon from '~/components/icons/verify-icon'
import { UserContext } from '~/lib/context'
import formatDate from '~/lib/utils/formatDate'

export default component$(() => {
  const { userData: user, userThreads: threads } = useContext(UserContext)

  const uploadMedia = (url: string) => {
    return url
  }

  return (
    <div class='flex flex-col gap-3'>
      {threads.map((thread) => (
        <article
          key={thread.id}
          class='flex flex-col gap-3 pb-3 border-b border-threads-white/[0.15]'
        >
          {thread.thread_items.map((item) => (
            <div key={item.post.id} class='flex gap-3'>
              <Image
                class='rounded-full'
                src={uploadMedia(item.post.user.profile_pic_url)}
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
                <p class='text-threads-white'>{item.post.caption.text}</p>
              </div>
            </div>
          ))}
        </article>
      ))}
    </div>
  )
})
