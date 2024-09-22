import { Terminal } from 'lucide-react'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import Link from 'next/link'

export function AddMemberAlert({ className = '' }: { className?: string }) {
  return (
    <Alert variant={'information'} className={`${className}`}>
      <Terminal className="h-5 w-5" />
      <AlertTitle>Member management</AlertTitle>
      <AlertDescription>
        To create a URL for registering a new member,{' '}
        <Link href={'/member'} className={'font-bold underline'}>
          Click here
        </Link>
      </AlertDescription>
    </Alert>
  )
}
