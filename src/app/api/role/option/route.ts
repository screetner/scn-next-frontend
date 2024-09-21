import axios from '@/lib/axios'
import { NextResponse } from 'next/server'
import { OPTION } from '@/types/option'

export async function GET() {
  const { data } = await axios.get<OPTION[]>(`/role/option`)
  return NextResponse.json(data)
}
