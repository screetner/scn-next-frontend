import { NextRequest, NextResponse } from 'next/server';
import { ActivityLogs } from '@/types/activity-logs'
import axios from '@/lib/axios'
import apiEndpoints from '@/config/apiEndpoints'

export async function GET(req: NextRequest, context : any) {
  const { params } = context

  const {data} = await axios.get<ActivityLogs>(`${apiEndpoints.logs.getUserActivityLogs(params.userId)}`)
  return NextResponse.json(data)
}
