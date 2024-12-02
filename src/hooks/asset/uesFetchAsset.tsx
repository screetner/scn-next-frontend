import { useQuery } from '@tanstack/react-query'
import CustomFetch from '@/lib/customFetch'
import { IndividualAssetResponse } from '@/types/dashboard'

interface useFetchAssetProps {
  assetId: string
}

export function uesFetchAsset({ assetId }: useFetchAssetProps) {
  return useQuery<IndividualAssetResponse>({
    queryKey: ['asset', assetId],
    queryFn: async () =>
      await CustomFetch<IndividualAssetResponse>(
        `/api/asset/${assetId}`,
        'GET',
      ),
  })
}
