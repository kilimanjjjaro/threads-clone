import {
  component$,
  Slot,
  useContextProvider,
  useSignal
} from '@builder.io/qwik'
import Footer from '~/components/footer'
import GetTheApp from '~/components/get-the-app'
import Loading from '~/components/loading'
import { ModalContext } from '~/lib/context'
import type { RequestHandler } from '@builder.io/qwik-city'

export const onGet: RequestHandler = async ({ cacheControl }) => {
  cacheControl({
    staleWhileRevalidate: 60 * 60 * 24 * 7,
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
      <GetTheApp />
      <Loading />
    </>
  )
})
