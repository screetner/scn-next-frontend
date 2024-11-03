import { Location } from '@/types/map'

export type OrganizationAll = {
  orgId: string
  orgName: string
  orgMember: number
  orgAssets: number
}

export type OrganizationInfo = {
  name: string
  border: Location[] | null
  createdAt: Date | null
  updatedAt: Date | null
}
