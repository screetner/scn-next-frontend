import { RoleMember } from '@/types/role'
import CustomFetch from '@/lib/customFetch'
import { useQuery } from '@tanstack/react-query'

export function UseFetchUnAssignUser() {
  return useQuery<RoleMember[]>({
    queryKey: ['/api/role/unassigned'],
    queryFn: () => CustomFetch<RoleMember[]>('/api/role/unassigned', 'GET'),
  })
}
