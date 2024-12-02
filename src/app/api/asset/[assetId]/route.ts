import { NextRequest, NextResponse } from 'next/server'
import axios from '@/lib/axios'
import apiEndpoints from '@/config/apiEndpoints'

export async function GET(req: NextRequest, context: any) {
  const { params } = context
  const { data } = await axios.get(
    `${apiEndpoints.dashboard.getAssetsById(params.assetId)}`,
  )
  return NextResponse.json(data)
}
