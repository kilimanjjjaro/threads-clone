import { component$, useContext } from '@builder.io/qwik'
import Thread from '~/components/threads/thread'
import { UserContext } from '~/lib/context'

const SINGLE_ITEM = 1
const FIRST_ITEM = 0

export default component$(() => {
  const { userThreads: threads } = useContext(UserContext)

  return (
    <div class='flex flex-col gap-4'>
      {threads.map((thread, index) => {
        const multipleItems = thread.thread_items.length > SINGLE_ITEM
        const lastIndex = threads.length - SINGLE_ITEM

        return (
          <article
            key={thread.id}
            class={`flex flex-col gap-2 ${
              index !== lastIndex && 'border-b border-threads-white/10 pb-4'
            }`}
          >
            {thread.thread_items.map((item, index) => {
              const nestedItem = index > FIRST_ITEM && multipleItems

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
