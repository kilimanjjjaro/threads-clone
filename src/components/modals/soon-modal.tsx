import { component$, useContext } from '@builder.io/qwik'
import ThreadsLogo from '~/components/icons/threads-logo'
import { UserContext } from '~/lib/context'

export default component$(() => {
  const { userData: user } = useContext(UserContext)

  return (
    <section class='md:w-[400px]'>
      <div class='flex flex-col gap-4 overflow-hidden rounded-2xl border border-threads-white/10 bg-threads-black p-6'>
        <div class='flex items-center justify-between'>
          <h2 class='text-2xl font-bold text-threads-white'>threads.net</h2>
          <div class='flex h-16 w-16 items-center justify-center rounded-full bg-black'>
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
