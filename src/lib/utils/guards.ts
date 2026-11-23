import type { UserThreadsInterface } from '~/lib/interfaces/threads'
import type { UserDataInterface } from '~/lib/interfaces/users'

interface UploadResponse {
  public_id: string
  width: number
  height: number
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

export function isUserResponse(
  value: unknown
): value is Required<UserDataInterface> {
  return (
    isRecord(value) &&
    isRecord(value.data) &&
    isRecord(value.data.user) &&
    typeof value.data.user.username === 'string'
  )
}

export function isThreadsResponse(
  value: unknown
): value is Required<UserThreadsInterface> {
  return (
    isRecord(value) &&
    isRecord(value.data) &&
    isRecord(value.data.mediaData) &&
    Array.isArray(value.data.mediaData.threads)
  )
}

export function isUploadResponse(value: unknown): value is UploadResponse {
  return (
    isRecord(value) &&
    typeof value.public_id === 'string' &&
    typeof value.width === 'number' &&
    typeof value.height === 'number'
  )
}
