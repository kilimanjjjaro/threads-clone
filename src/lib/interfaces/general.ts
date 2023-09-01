import { ThreadInterface } from './threads'
import { UserInterface } from './users'

export interface UserContextInterface {
  userData: UserInterface
  userThreads: ThreadInterface[]
}
