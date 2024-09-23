import { NextResponse } from 'next/server'
import axios from '@/lib/axios'
import { RoleMember } from '@/types/role'
import apiEndpoints from '@/config/apiEndpoints'

export async function GET() {
  const { data } = await axios.get<RoleMember[]>(
    `${apiEndpoints.role.getListOfUnRoleMembers}`,
  )
  return NextResponse.json(data)
}
