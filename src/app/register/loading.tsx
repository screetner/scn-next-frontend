import { Skeleton } from '@/components/ui/skeleton'
import { TypographyH2 } from '@/components/typography/TypographyH2'

export default function LoadingCheckingRegisterToken() {
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <Skeleton className="h-6 w-48" />
      <Skeleton className="h-6 w-40" />
      <TypographyH2 text={'Checking your registration token, please wait...'} />
    </div>
  )
}
