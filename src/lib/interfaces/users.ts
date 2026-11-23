interface Data {
  user: UserInterface
}

export interface BioLink {
  url: string
}

interface HDProfilePicVersion {
  height: number
  url: string
  width: number
}

interface BiographyWithEntities {
  entities: unknown[]
  raw_text: string
}

interface Extensions {
  is_final: boolean
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
  account_badges: unknown[]
  full_name: string
  bio_links: BioLink[]
  transparency_label: null
  gating: null
  id: string
}

export interface UserDataInterface {
  // Error responses carry errors instead of data.
  data?: Data
  extensions: Extensions
}
