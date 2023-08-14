type Data = {
  userData: UserData
}

type UserData = {
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

type Extensions = {
  is_final: boolean
}

type followerCount = {
  count: number
  label: string
}

export interface UserInterface {
  is_private: boolean
  profile_pic_url: string
  username: string
  hd_profile_pic_versions: HDProfilePicVersion[]
  is_verified: boolean
  biography: string
  biography_with_entities: null
  follower_count: number
  profile_context_facepile_users: null
  bio_links: BioLink[]
  pk: string
  full_name: string
  id: null
}

export interface UserDataInterface {
  data: Data
  extensions: Extensions
}
