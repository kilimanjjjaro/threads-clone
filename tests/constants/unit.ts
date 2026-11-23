export const USERNAME = 'zuck'
export const USER_ID = '63055343223'
export const MAX_PROFILE_THREADS = 5

export const NOW = new Date('2026-11-23T12:00:00Z')

const SECONDS_IN_A_MINUTE = 60
const SECONDS_IN_AN_HOUR = 3600
const SECONDS_IN_A_DAY = 86_400
const SECONDS_IN_A_WEEK = 604_800
export const SECONDS_IN_A_MONTH = 2_592_000

export const RELATIVE_DATE_CASES: Array<
  [secondsAgo: number, expected: string]
> = [
  [0, 'Just now'],
  [5, 'Just now'],
  [6, '6s'],
  [SECONDS_IN_A_MINUTE - 1, '59s'],
  [SECONDS_IN_A_MINUTE, '1m'],
  [SECONDS_IN_AN_HOUR - 1, '59m'],
  [SECONDS_IN_AN_HOUR, '1h'],
  [SECONDS_IN_A_DAY - 1, '23h'],
  [SECONDS_IN_A_DAY, '1d'],
  [SECONDS_IN_A_WEEK - 1, '6d'],
  [SECONDS_IN_A_WEEK, '1w'],
  [SECONDS_IN_A_MONTH - 1, '4w']
]
export const MONTH_AGO_DATE = '10/24/26'

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
