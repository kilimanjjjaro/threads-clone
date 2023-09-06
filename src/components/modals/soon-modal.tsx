import { component$, useContext } from '@builder.io/qwik'
import ThreadsLogo from '~/components/icons/threads-logo'
import { UserContext } from '~/lib/context'

export default component$(() => {
  const { userData: user } = useContext(UserContext)

  return (
    <section class='md:w-[400px]'>
      <div class='bg-threads-black border flex flex-col gap-4 p-6 border-threads-white/[0.15] rounded-2xl overflow-hidden'>
        <div class='flex justify-between items-center'>
          <h2 class='text-2xl text-threads-white font-bold'>threads.net</h2>
          <div class='w-16 h-16 bg-black rounded-full flex justify-center items-center'>
            <ThreadsLogo classes='w-8 h-8 text-threads-white' />
          </div>
        </div>
        <p class='text-threads-light-gray'>
          Soon, you'll be able to follow and interact with people on other
          fediverse platforms, like Mastodon. They can also find people on
          Threads using full usernames, like @{user.username}@threads.net.
        </p>
      </div>
    </section>
  )
})
