export type TSignIn = {
    username: string
    password: string
}

type TUser = {
    username : string
    roleId : number
    roleName : string
    email : string
    organization_name : string
}

export type TSignInResponse = {
    token : string,
    user : TUser
}

export type TSessions = TUser & {
    token : string
}