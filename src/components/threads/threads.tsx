import { component$, useContext } from '@builder.io/qwik'
import Thread from '~/components/threads/thread'
import { UserContext } from '~/lib/context'

export default component$(() => {
  const { userThreads: threads } = useContext(UserContext)

  return (
    <div class='flex flex-col gap-4'>
      {threads.map((thread, index) => {
        const multipleItems = thread.thread_items.length > 1
        const lastIndex = threads.length - 1

        return (
          <article
            key={thread.id}
            class={`flex flex-col gap-2 ${
              index !== lastIndex && 'pb-4 border-b border-threads-white/10'
            }`}
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
