import { Signal } from '@builder.io/qwik'
import { ThreadInterface } from './threads'
import { UserInterface } from './users'

export interface UserContextInterface {
  userData: UserInterface
  userThreads: ThreadInterface[]
}

export interface ModalContextInterface {
  modalCode: Signal<number>
}

export interface CloudinaryImageInterface {
  url: string
  width: number
  height: number
  type: string
}
