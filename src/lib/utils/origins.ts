const DEFAULT_THREADS_ORIGIN = 'https://www.threads.com'
const DEFAULT_CLOUDINARY_API_ORIGIN = 'https://api.cloudinary.com'

function serverEnv(name: string) {
  return typeof process === 'undefined' ? undefined : process.env[name]
}

export function threadsOrigin() {
  return serverEnv('THREADS_ORIGIN') ?? DEFAULT_THREADS_ORIGIN
}

export function cloudinaryApiOrigin() {
  return serverEnv('CLOUDINARY_API_ORIGIN') ?? DEFAULT_CLOUDINARY_API_ORIGIN
}
