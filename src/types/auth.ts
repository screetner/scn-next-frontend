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
    accessTokenExpiry : number
}

export type TSignInResponse = {
    user : TUser
}

export type TSessions = TUser & {
    token : string
}