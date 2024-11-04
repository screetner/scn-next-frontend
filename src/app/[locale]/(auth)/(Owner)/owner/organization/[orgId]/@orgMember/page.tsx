import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { parallelProps } from '@/app/[locale]/(auth)/(Owner)/owner/organization/[orgId]/parallelProps'
import { getMemberByOrgId } from '@/actions/owner/member'
import ErrorComponent from '@/components/ErrorComponent'
import AllMemberTable from '@/components/table/AllMemberTable'
import AddAdminButton from '@/app/[locale]/(auth)/(Owner)/owner/organization/[orgId]/@orgMember/AddAdminButton'

export default async function OrgMember({ params }: parallelProps) {
  const { error, data } = await getMemberByOrgId(params.orgId)
  return (
    <Card>
      <CardHeader>
        <div className={'flex justify-between'}>
          <CardTitle>Organization Members</CardTitle>
          <AddAdminButton orgId={params.orgId} />
        </div>
      </CardHeader>
      <CardContent>
        {error ? (
          <ErrorComponent title={error} />
        ) : (
          <AllMemberTable data={data} />
        )}
      </CardContent>
    </Card>
  )
}
