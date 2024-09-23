import axios from '@/lib/axios'
import { NextResponse } from 'next/server'
import { OPTION } from '@/types/option'
import apiEndpoints from '@/config/apiEndpoints'

export async function GET() {
  const { data } = await axios.get<OPTION[]>(
    `${apiEndpoints.role.getRoleOptions}`,
  )
  return NextResponse.json(data)
}
