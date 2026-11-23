import { createContextId } from '@builder.io/qwik'
import type { Signal } from '@builder.io/qwik'
import type { MODAL_CODES } from '~/lib/constants'
import type {
  ModalContextInterface,
  UserContextInterface
} from '~/lib/interfaces/general'

export const UserContext = createContextId<UserContextInterface>('user')

export const ModalContext = createContextId<ModalContextInterface>('modals')

export function setModal(modalCode: Signal<MODAL_CODES>, code: MODAL_CODES) {
  // eslint-disable-next-line no-param-reassign -- qwik signals are updated through their value setter
  modalCode.value = code
}
