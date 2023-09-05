import { component$, useContext } from '@builder.io/qwik'
import Thread from '~/components/threads/thread'
import { UserContext } from '~/lib/context'

export default component$(() => {
  const { userThreads: threads } = useContext(UserContext)

  return (
    <div class='flex flex-col gap-3'>
      {threads.map((thread) => (
        <article
          key={thread.id}
          class='flex flex-col gap-3 pb-3 border-b border-threads-white/[0.15]'
        >
          {thread.thread_items.map((item) => (
            <Thread key={item.post.id} thread={item} />
          ))}
        </article>
      ))}
    </div>
  )
})
