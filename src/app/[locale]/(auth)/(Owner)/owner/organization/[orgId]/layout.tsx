import React from 'react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Terminal } from 'lucide-react'
import { getOrganizationIfo } from '@/actions/owner/organization'
import dayjs from 'dayjs'
import OrgMap from '@/app/[locale]/(auth)/(Owner)/owner/organization/[orgId]/OrgMap'

interface LayoutProps {
  children: React.ReactNode
  orgAsset: React.ReactNode
  orgMember: React.ReactNode
  orgRole: React.ReactNode
  params: {
    orgId: string
  }
}

export default async function Layout({
  orgAsset,
  orgRole,
  orgMember,
  children,
  params: { orgId },
}: LayoutProps) {
  const { data, error } = await getOrganizationIfo(orgId)
  console.log(data, error)
  const createdDate = dayjs(data.createdAt!).format('YYYY-MM-DD')

  return (
    <div>
      <div className={'mb-3'}>
        <Alert variant={'information'}>
          <Terminal className="h-4 w-4" />
          <AlertTitle>{data.name}</AlertTitle>
          <AlertDescription>Created At : {createdDate}</AlertDescription>
        </Alert>
      </div>
      <div className={'mb-2'}>{orgAsset}</div>
      <div className={'grid gap-4 md:grid-cols-2 md:gap-3 lg:grid-cols-3 mb-5'}>
        {orgRole}
        {orgMember}
        <OrgMap borders={data.border || []} />
      </div>
      {children}
    </div>
  )
}
