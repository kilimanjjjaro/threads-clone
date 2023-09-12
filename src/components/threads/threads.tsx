import { component$, useContext } from '@builder.io/qwik'
import Thread from '~/components/threads/thread'
import { UserContext } from '~/lib/context'

export default component$(() => {
  const { userThreads: threads } = useContext(UserContext)

  return (
    <div class='flex flex-col gap-4'>
      {threads.map((thread) => {
        const multipleItems = thread.thread_items.length > 1

        return (
          <article
            key={thread.id}
            class='flex flex-col pb-4 gap-2 border-b border-threads-white/[0.15]'
          >
            {thread.thread_items.map((item, index) => {
              const nestedItem = index > 0 && multipleItems

              return (
                <Thread
                  key={item.post.id}
                  thread={item}
                  nestedItem={nestedItem}
                  multipleItems={multipleItems}
                />
              )
            })}
          </article>
        )
      })}
    </div>
  )
})
