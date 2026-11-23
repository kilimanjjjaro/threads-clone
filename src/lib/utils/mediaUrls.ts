const FIRST_VERSION = 0

interface WithImages {
  image_versions2: { candidates: Array<{ url: string }> }
}

interface WithVideos {
  video_versions: Array<{ url: string }> | null
}

export function imageUrl({ image_versions2: { candidates } }: WithImages) {
  return candidates.at(FIRST_VERSION)?.url ?? ''
}

export function videoUrl({ video_versions: versions }: WithVideos) {
  return versions?.at(FIRST_VERSION)?.url ?? ''
}

export function aspectRatio(
  media: { width: number; height: number } | undefined
) {
  return media === undefined ? undefined : media.width / media.height
}
