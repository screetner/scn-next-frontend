export type RecentMember = Member[]

export type Member = {
  userId: string
  username: string
  email: string
  roleName: string
  createdAt: string
}

export type TotalMember = {
  allMembers: number
  percentageIncrease: number
}

export type TotalInvite = {
  inviteTotal: number
  inviteActivate: number
}

export type InviteList = {
  inviterEmail: string | null
  inviteeEmail: string
  time: string
}
