import { describe, expect, it, vi } from 'vitest'
import { cloudinaryApiOrigin, threadsOrigin } from '~/lib/utils/origins'
import { THREADS_ORIGIN } from '../constants/unit'

const MOCK_ORIGIN = 'http://localhost:3101'

describe('origins', () => {
  it('default to the real threads and cloudinary apis', () => {
    expect(threadsOrigin()).toBe(THREADS_ORIGIN)
    expect(cloudinaryApiOrigin()).toBe('https://api.cloudinary.com')
  })

  it('can be overridden on the server through env vars', () => {
    vi.stubEnv('THREADS_ORIGIN', MOCK_ORIGIN)
    vi.stubEnv('CLOUDINARY_API_ORIGIN', MOCK_ORIGIN)

    expect(threadsOrigin()).toBe(MOCK_ORIGIN)
    expect(cloudinaryApiOrigin()).toBe(MOCK_ORIGIN)
  })
})
