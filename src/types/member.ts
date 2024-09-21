export type RecentMember = Member[]

export type Member = {
  userId: string
  userName: string
  email: string
  roleName: string
  createdAt: string
}

export type TotalInvite = {
  inviteTotal: number
  inviteActivate: number
}
