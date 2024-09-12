import { NextRequest, NextResponse } from 'next/server'
import axios from '@/lib/axios'
import { RoleMember } from '@/types/role'
import { CatchAxiosError } from '@/utils/CatchAxiosError'

export async function GET(req: NextRequest) {
  try {
    const { data } = await axios.get<RoleMember[]>(`/role/unassigned`)
    return NextResponse.json(data)
  } catch (e) {
    CatchAxiosError(e)
  }
}
