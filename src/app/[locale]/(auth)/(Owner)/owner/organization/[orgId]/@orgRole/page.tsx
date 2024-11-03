import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getRolesByOrgId } from '@/actions/owner/role'
import RoleTable from '@/components/table/RoleTable'
import ErrorComponent from '@/components/ErrorComponent'

interface OrgRoleProps {
  params: {
    orgId: string
  }
}

export default async function OrgRole({ params }: OrgRoleProps) {
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
          <RoleTable roles={data} allowCreateRole={false} />
        )}
      </CardContent>
    </Card>
  )
}
