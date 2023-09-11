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
          {thread.thread_items.map((item, index) => {
            const nested = index > 0 && thread.thread_items.length > 1

            return <Thread key={item.post.id} thread={item} nested={nested} />
          })}
        </article>
      ))}
    </div>
  )
})
