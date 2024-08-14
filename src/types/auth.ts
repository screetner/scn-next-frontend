export type TSignIn = {
    username: string
    password: string
}

type TUser = {
    accessToken : string
    username : string
    roleName : string
    email : string
    orgName : string
    accessTokenExpiry : string
    refreshToken : string
}

export type TSignInResponse = {
    user : TUser
}

export type TSessions = TUser

export type TRefreshTokenResponse = {
    accessToken : string
    accessTokenExpiry : string
}