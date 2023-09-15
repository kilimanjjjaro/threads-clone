interface Data {
  mediaData: MediaData
}

interface MediaData {
  threads: ThreadInterface[]
}

enum ThreadItemTypename {
  XDTThreadItem = 'XDTThreadItem'
}

enum LineType {
  Line = 'line',
  Squiggle = 'squiggle'
}

interface Post {
  user: User
  image_versions2: ImageVersions2
  original_width: number
  original_height: number
  video_versions: any[]
  carousel_media: CarouselMedia[] | null
  carousel_media_count: null
  pk: string
  has_audio: null
  text_post_app_info: PostTextPostAppInfo
  caption: Caption | null
  taken_at: number
  like_count: number
  code: string
  media_overlay_info: null
  id: string
}

interface Caption {
  text: string
}

interface ImageVersions2 {
  candidates: Candidate[]
}

export interface Candidate {
  height: number
  url: string
  width: number
  __typename: CandidateTypename
}

enum CandidateTypename {
  XDTImageCandidate = 'XDTImageCandidate'
}

interface PostTextPostAppInfo {
  link_preview_attachment: null
  share_info: PurpleShareInfo
  reply_to_author: ReplyToAuthor | null
  is_post_unavailable: boolean
}

interface ReplyToAuthor {
  username: Username
  id: null
}

enum Username {
  EnvyWorldwide = 'envy_worldwide',
  Zuck = 'zuck'
}

interface PurpleShareInfo {
  quoted_post: QuotedPost | null
  reposted_post: null
}

export interface CarouselMedia {
  image_versions2: ImageVersions2
  video_versions: any[]
  has_audio: null
  original_width: number
  original_height: number
  pk: string
  id: string
}

export interface QuotedPost {
  text_post_app_info: QuotedPostTextPostAppInfo
  user: User
  pk: string
  media_overlay_info: null
  code: string
  caption: Caption | null
  image_versions2: ImageVersions2
  original_width: number
  original_height: number
  video_versions: any[]
  carousel_media: CarouselMedia[] | null
  carousel_media_count: null
  has_audio: null
  like_count: number
  taken_at: number
  id: string
}

interface QuotedPostTextPostAppInfo {
  is_post_unavailable: boolean
  share_info: FluffyShareInfo
  direct_reply_count: number
  link_preview_attachment: null
}

interface FluffyShareInfo {
  quoted_post: null
}

interface User {
  is_verified: boolean
  username: Username
  id: null
  profile_pic_url: string
  pk?: string
}

export interface ReplyFacepileUser {
  __typename: ReplyFacepileUserTypename
  id: null
  profile_pic_url: string
}

enum ReplyFacepileUserTypename {
  XDTUserDict = 'XDTUserDict'
}

interface Extensions {
  is_final: boolean
}

export interface ThreadItem {
  post: Post
  line_type: LineType
  view_replies_cta_string: string
  reply_facepile_users: ReplyFacepileUser[]
  should_show_replies_cta: boolean
  __typename: ThreadItemTypename
}

export interface ThreadInterface {
  thread_items: ThreadItem[]
  id: string
}

export interface UserThreadsInterface {
  data: Data
  extensions: Extensions
}
