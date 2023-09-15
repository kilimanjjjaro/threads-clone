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
          <>
            {thread.thread_items
              .filter((item) => item.post.caption !== null)
              .map((item, index) => {
                const nestedItem = index > 0 && multipleItems
                return (
                  <article
                    key={item.post.id}
                    class='flex flex-col pb-4 gap-2 border-b border-threads-white/[0.15]'
                  >
                    <Thread
                      thread={item}
                      nestedItem={nestedItem}
                      multipleItems={multipleItems}
                    />
                  </article>
                )
              })}
          </>
        )
      })}
    </div>
  )
})
