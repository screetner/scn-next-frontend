import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getRolesByOrgId } from '@/actions/owner/role'
import RoleTable from '@/components/table/RoleTable'
import ErrorComponent from '@/components/ErrorComponent'
import { parallelProps } from '@/app/[locale]/(auth)/(Owner)/owner/organization/[orgId]/parallelProps'

export default async function OrgRole({ params }: parallelProps) {
  const { data, error } = await getRolesByOrgId(params.orgId)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Organization Role</CardTitle>
      </CardHeader>
      <CardContent>
        {error ? (
          <ErrorComponent title={error} />
        ) : (
          <RoleTable roles={data} ownerView={true} />
        )}
      </CardContent>
    </Card>
  )
}
