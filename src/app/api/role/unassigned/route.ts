import { NextResponse } from 'next/server'
import axios from '@/lib/axios'
import { RoleMember } from '@/types/role'

export async function GET() {
  const { data } = await axios.get<RoleMember[]>(`/role/unassigned`)
  return NextResponse.json(data)
}
