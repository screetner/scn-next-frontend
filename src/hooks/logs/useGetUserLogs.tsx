import { useQuery } from '@tanstack/react-query'
import { ActivityLogsResponse } from '@/types/activity-logs'
import CustomFetch from '@/lib/customFetch'
import { useSession } from 'next-auth/react'

export function useGetUserLogs(){
  const { data: session } = useSession()
  const userId = session?.user?.userId

  return useQuery<ActivityLogsResponse>({
    queryKey: ['logs', userId],
    queryFn: async () => await CustomFetch<ActivityLogsResponse>(`/api/logs/user/${userId}`, 'GET')
  })
}