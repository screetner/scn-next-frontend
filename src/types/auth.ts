export type TSignIn = {
  username: string
  password: string
}

type TUser = {
  accessToken: string
  username: string
  roleName: string
  email: string
  organization_name: string
  accessTokenExpiry: string
  refreshToken: string
  isOwner: boolean
}

export type TSignInResponse = {
  user: TUser
}

export type TSessions = TUser

export type TRefreshTokenResponse = {
  accessToken: string
  accessTokenExpiry: string
}
