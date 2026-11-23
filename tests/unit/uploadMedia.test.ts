import { beforeEach, describe, expect, it, vi } from 'vitest'
import { uploadMedia } from '~/lib/utils/uploadMedia'
import {
  CLOUDINARY_API,
  CLOUDINARY_DELIVERY,
  UPLOAD_CASES,
  UPLOADED_HEIGHT,
  UPLOADED_PUBLIC_ID,
  UPLOADED_TRANSFORMATION,
  UPLOADED_WIDTH
} from '../constants/unit'
import { jsonBody, networkError, stubFetch, threadsApi } from '../utils/http'

const MEDIA_URL = 'https://cdn.test/media/1.jpg'

function withoutQuery(url: string) {
  const [path] = url.split('?')
  return path
}

const silenceErrors = () =>
  vi.spyOn(console, 'error').mockImplementation(() => undefined)

describe('uploadMedia', () => {
  beforeEach(() => {
    silenceErrors()
  })

  describe.each(UPLOAD_CASES)('$type', ({ type, resource, preset, folder }) => {
    it('uploads to the matching cloudinary preset and folder', async () => {
      const fetchMock = stubFetch(threadsApi())

      await uploadMedia({ mediaUrl: MEDIA_URL, type })

      const {
        mock: {
          calls: [[url, init]]
        }
      } = fetchMock
      expect(url).toBe(`${CLOUDINARY_API}/${resource}/upload`)
      expect(init?.method).toBe('POST')
      expect(jsonBody(init)).toEqual({
        file: MEDIA_URL,
        upload_preset: preset,
        folder
      })
    })

    it('returns a 600px wide, 70% quality delivery url', async () => {
      stubFetch(threadsApi())

      const media = await uploadMedia({ mediaUrl: MEDIA_URL, type })

      expect(media).toMatchObject({
        width: UPLOADED_WIDTH,
        height: UPLOADED_HEIGHT,
        type: resource
      })
      expect(withoutQuery(media?.url ?? '')).toBe(
        `${CLOUDINARY_DELIVERY}/${resource}/upload/${UPLOADED_TRANSFORMATION}/${UPLOADED_PUBLIC_ID}`
      )
    })
  })

  it('returns undefined and logs when the upload fails', async () => {
    stubFetch(threadsApi({ upload: networkError() }))
    const consoleError = silenceErrors()

    await expect(
      uploadMedia({ mediaUrl: MEDIA_URL, type: 'image' })
    ).resolves.toBeUndefined()
    expect(consoleError).toHaveBeenCalled()
  })
})
