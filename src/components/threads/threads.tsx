import { component$ } from '@builder.io/qwik'
import type { ThreadInterface } from '~/lib/interfaces/threads'

interface Props {
  threads: ThreadInterface[]
}

export default component$(({ threads }: Props) => {
  return (
    <div class='flex flex-col gap-3'>
      {threads.map((thread) => (
        <article
          key={thread.id}
          class='pb-3 text-threads-white text-center border-b border-threads-white/[0.15]'
        >
          To do
        </article>
      ))}
    </div>
  )
})
