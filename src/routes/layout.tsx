import {
  $,
  component$,
  Slot,
  useContextProvider,
  useSignal
} from '@builder.io/qwik'
import Footer from '~/components/footer'
import GetTheApp from '~/components/get-the-app'
import Loading from '~/components/loading'
import { ModalContext } from '~/lib/context'
import { MODAL_CODES } from '~/lib/constants'
import type { RequestHandler } from '@builder.io/qwik-city'

const SECONDS_IN_A_WEEK = 604_800
const PAGE_MAX_AGE_SECONDS = 5

export const onGet: RequestHandler = ({ cacheControl }) => {
  cacheControl({
    staleWhileRevalidate: SECONDS_IN_A_WEEK,
    maxAge: PAGE_MAX_AGE_SECONDS
  })
}

export default component$(() => {
  const modalCode = useSignal<MODAL_CODES>(MODAL_CODES.HIDDEN)

  const openModal = $((code: MODAL_CODES) => {
    modalCode.value = code
  })

  useContextProvider(ModalContext, { modalCode, openModal })

  return (
    <>
      <Slot />
      <Footer />
      <GetTheApp />
      <Loading />
    </>
  )
})
