import type { QRL, Signal } from '@builder.io/qwik'
import type { MODAL_CODES } from '~/lib/constants'
import type { ThreadInterface } from '~/lib/interfaces/threads'
import type { UserInterface } from '~/lib/interfaces/users'

export interface UserContextInterface {
  userData: UserInterface
  userThreads: ThreadInterface[]
}

export interface ModalContextInterface {
  modalCode: Signal<MODAL_CODES>
  openModal: QRL<(code: MODAL_CODES) => void>
}

export interface CloudinaryImageInterface {
  url: string
  width: number
  height: number
  type: string
}
