export interface LoginDTO {
  username: string
  password: string
}

export interface UserDataDTO {
  name: string
  email: string
  is_superuser: boolean
  profile_current_id: number
  profile_current: string
  permissions: {
    url: string
    view: boolean
    add: boolean
    change: boolean
    delete: boolean
  }[]
  authenticated: boolean
  profiles: {
    profile_id: number
    profile: string
  }[]
}

export interface LoginResponseDTO {
  userData: UserDataDTO
  accessToken: {
    token: string
    tokenExpiresIn: Date
  }
}
