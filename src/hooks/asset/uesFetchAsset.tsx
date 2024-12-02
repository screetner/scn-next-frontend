import { useQuery } from '@tanstack/react-query'
import CustomFetch from '@/lib/customFetch'
import { IndividualAssetResponse } from '@/types/dashboard'

interface UseFetchAssetProps {
  assetId: string
}

export function useFetchAsset({ assetId }: UseFetchAssetProps) {
  return useQuery<IndividualAssetResponse>({
    queryKey: ['asset', assetId],
    queryFn: async () =>
      await CustomFetch<IndividualAssetResponse>(
        `/api/asset/${assetId}`,
        'GET',
      ),
  })
}
