import {
  component$,
  Slot,
  useContextProvider,
  useSignal
} from '@builder.io/qwik'
import Footer from '~/components/footer/footer'
import type { RequestHandler } from '@builder.io/qwik-city'
import Modals from '~/components/modals/modals'
import { ModalContext } from '~/lib/context'

export const onGet: RequestHandler = async ({ cacheControl }) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.builder.io/docs/caching/
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5
  })
}

export default component$(() => {
  const modalCode = useSignal(0)

  useContextProvider(ModalContext, { modalCode })

  return (
    <>
      <Slot />
      <Footer />
      <Modals />
    </>
  )
})
