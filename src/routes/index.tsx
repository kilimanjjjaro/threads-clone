import { component$ } from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'
import Header from '~/components/header/header'
import Footer from '~/components/footer/footer'

export default component$(() => {
  return (
    <>
      <Header />
      <main>
        <h3>You can count on me</h3>
      </main>
      <Footer />
    </>
  )
})

export const head: DocumentHead = {
  title: 'Welcome to Qwik',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description'
    }
  ]
}
