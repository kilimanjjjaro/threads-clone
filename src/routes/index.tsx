import { component$ } from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'
import Header from '~/components/header/header'
import Filters from '~/components/threads/filters'
import Threads from '~/components/threads/threads'
import DownloadThreads from '~/components/download-threads/download-threads'
import Footer from '~/components/footer/footer'

export default component$(() => {
  return (
    <>
      <Header />
      <main class='flex flex-col gap-4 mb-4'>
        <Filters />
        <Threads />
      </main>
      <DownloadThreads />
      <Footer />
    </>
  )
})

export const head: DocumentHead = {
  title: 'Threads Clone',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description'
    }
  ]
}
