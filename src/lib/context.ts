import { createContextId, useContextProvider } from '@builder.io/qwik'
import type { UserContextInterface } from '~/lib/interfaces/general'

export const UserContext = createContextId<UserContextInterface>('user')

export const ModalsContext = createContextId<UserContextInterface>('modals')
