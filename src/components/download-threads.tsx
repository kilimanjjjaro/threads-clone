import { component$, useContext } from '@builder.io/qwik'
import { Link } from '@builder.io/qwik-city'
import { UserContext } from '~/lib/context'

export default component$(() => {
  const { userData: user } = useContext(UserContext)

  return (
    <div class='flex items-center justify-between rounded-2xl border border-threads-white/10 bg-[#181818] px-4 py-4'>
      <span class='font-semibold text-balance text-threads-white'>
        Log in to see more from {user.username}.
      </span>
      <Link
        class='rounded-[10px] border border-threads-white/10 px-4 pt-1 pb-[6px] font-semibold text-threads-white duration-300 ease-in-out active:scale-90 xl:hover:border-threads-white/40'
        href='/'
      >
        Log in
      </Link>
    </div>
  )
})
