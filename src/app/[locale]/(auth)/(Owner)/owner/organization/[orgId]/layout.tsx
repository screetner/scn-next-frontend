import React from 'react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Terminal } from 'lucide-react'

interface LayoutProps {
  children: React.ReactNode
  orgAsset: React.ReactNode
  orgMember: React.ReactNode
  orgRole: React.ReactNode
}

export default function Layout({
  orgAsset,
  orgRole,
  orgMember,
  children,
}: LayoutProps) {
  return (
    <div>
      <div className={'mb-3'}>
        <Alert>
          <Terminal className="h-4 w-4" />
          <AlertTitle>Notice</AlertTitle>
          <AlertDescription>This is a notice</AlertDescription>
        </Alert>
      </div>
      <div className={'grid gap-4 md:grid-cols-2 md:gap-3 lg:grid-cols-3 mb-5'}>
        {orgAsset}
        {orgRole}
        {orgMember}
      </div>
      {children}
    </div>
  )
}
