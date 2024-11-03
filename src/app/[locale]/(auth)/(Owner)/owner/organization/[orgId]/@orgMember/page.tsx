import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { parallelProps } from '@/app/[locale]/(auth)/(Owner)/owner/organization/[orgId]/parallelProps'
import { getMemberByOrgId } from '@/actions/owner/member'
import ErrorComponent from '@/components/ErrorComponent'
import AllMemberTable from '@/components/table/AllMemberTable'

export default async function OrgMember({ params }: parallelProps) {
  const { error, data } = await getMemberByOrgId(params.orgId)
  return (
    <Card>
      <CardHeader>
        <CardTitle>Organization Members</CardTitle>
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
