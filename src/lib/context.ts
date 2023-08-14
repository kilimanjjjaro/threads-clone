import { createContextId } from '@builder.io/qwik'
import type { ContextInterface } from '~/lib/interfaces/general'

export const UserContext = createContextId<ContextInterface>('user')
