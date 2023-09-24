import {
  component$,
  Slot,
  useContextProvider,
  useSignal,
  useVisibleTask$
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
  const isLoading = useSignal(true)
  const modalCode = useSignal(0)

  useVisibleTask$(async ({ cleanup }) => {
    const timeout = setTimeout(() => (isLoading.value = false), 1000)
    cleanup(() => clearTimeout(timeout))
  })

  useContextProvider(ModalContext, { modalCode })

  return (
    <>
      <Slot />
      <Footer />
      <GetTheApp />
      {isLoading.value && <Loading />}
    </>
  )
})
