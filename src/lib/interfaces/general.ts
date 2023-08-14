import { ThreadInterface } from './threads'
import { UserInterface } from './users'

export interface ContextInterface {
  userData: UserInterface
  userThreads: ThreadInterface[]
}
