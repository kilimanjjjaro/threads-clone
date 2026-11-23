import { createContextId } from '@builder.io/qwik'
import type {
  ModalContextInterface,
  UserContextInterface
} from '~/lib/interfaces/general'

export const UserContext = createContextId<UserContextInterface>('user')

export const ModalContext = createContextId<ModalContextInterface>('modals')
