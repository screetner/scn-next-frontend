import { useQuery } from '@tanstack/react-query'
import CustomFetch from '@/lib/customFetch'
import { OPTION } from '@/types/option'

export function useFetchRoleOptions() {
  return useQuery<OPTION[]>({
    queryKey: ['role', 'option'],
    queryFn: () => CustomFetch<OPTION[]>('/api/role/option', 'GET'),
  })
}
