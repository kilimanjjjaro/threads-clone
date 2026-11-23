export const USERNAME = 'zuck'
export const USER_ID = '63055343223'
export const FIRST_THREAD = 0
export const MAX_PROFILE_THREADS = 5

// relative-date-cases.json is relative to this date.
export const NOW = new Date('2026-11-23T12:00:00Z')
export const MS_IN_A_SECOND = 1000

export const THREADS_ORIGIN = 'https://www.threads.net'
export const THREADS_ENDPOINT = `${THREADS_ORIGIN}/api/graphql`
export const PROFILE_URL_PREFIX = `${THREADS_ORIGIN}/@`

export const CLOUDINARY_API = 'https://api.cloudinary.com/v1_1/dfzzgyj7r'
export const CLOUDINARY_DELIVERY = 'https://res.cloudinary.com/dfzzgyj7r'
export const UPLOADED_PUBLIC_ID = 'threads-clone/uploads/abc123'
export const UPLOADED_WIDTH = 1280
export const UPLOADED_HEIGHT = 640
export const UPLOADED_TRANSFORMATION = 'ar_2.0,c_scale,w_600/q_70/v1'

export const LAST_HD_AVATAR_URL = 'https://cdn.test/media/2.jpg'

export const UPLOAD_CASES = [
  {
    type: 'image',
    resource: 'image',
    preset: 'threads-clone-images',
    folder: 'threads-clone/thread-images'
  },
  {
    type: 'avatar',
    resource: 'image',
    preset: 'threads-clone-images',
    folder: 'threads-clone/user-avatars'
  },
  {
    type: 'video',
    resource: 'video',
    preset: 'threads-clone-videos',
    folder: 'threads-clone/thread-videos'
  }
]

export const XSS_PAYLOAD = '<img src=x onerror=alert(1)> hi @zuck'
