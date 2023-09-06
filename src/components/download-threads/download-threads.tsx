import { component$, useContext } from '@builder.io/qwik'
import { Image } from '@unpic/qwik'
import ThreadsLogo from '~/components/icons/threads-logo'
import { UserContext } from '~/lib/context'

export default component$(() => {
  const { userData: user } = useContext(UserContext)

  return (
    <div class='flex flex-col items-center py-11 px-4 bg-[#0a0a0a] rounded-2xl'>
      <div class='relative w-20 h-20 mb-4'>
        <div class='bg-black p-2 w-14 h-14 rounded-xl'>
          <ThreadsLogo classes='text-threads-white' />
        </div>
        <Image
          class='rounded-full absolute bottom-0 right-0 border-4 border-[#0a0a0a]'
          src={user.profile_pic_url}
          layout='constrained'
          width={58}
          height={58}
          alt={`${user.username}'s profile picture`}
          cdn='cloudinary'
        />
      </div>
      <span class='text-threads-light-gray mb-6'>
        Get the Threads app to like, reply and see more from {user.username}.
      </span>
      <a
        class='px-4 pt-1 pb-[6px] rounded-[10px] text-threads-white font-semibold border border-threads-white/[0.15] duration-300 ease-in-out active:scale-95 xl:hover:border-threads-white/40'
        href='https://www.threads.net/download/redirect'
        target='_blank'
        rel='noopener noreferrer'
      >
        Get Threads
      </a>
    </div>
  )
})
