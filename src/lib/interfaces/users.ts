type Data = {
  user: UserInterface
}

export type BioLink = {
  url: string
}

type HDProfilePicVersion = {
  height: number
  url: string
  width: number
}

type BiographyWithEntities = {
  entities: any[]
  raw_text: string
}

type Extensions = {
  is_final: boolean
}

type followerCount = {
  count: number
  label: string
}

export interface UserInterface {
  pk: string
  text_post_app_is_private: boolean
  hd_profile_pic_versions: HDProfilePicVersion[]
  profile_pic_url: string
  username: string
  friendship_status: null
  follower_count: number
  profile_context_facepile_users: null
  text_post_app_remove_mention_entrypoint: null
  is_verified: boolean
  biography: string
  biography_with_entities: BiographyWithEntities
  account_badges: any[]
  full_name: string
  bio_links: BioLink[]
  transparency_label: null
  gating: null
  id: string
}

export interface UserDataInterface {
  data: Data
  extensions: Extensions
}
