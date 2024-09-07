import RoleTable from './RoleTable'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import * as action from '@/actions'

export default async function RoleManagement() {
  const roles = await action.getRolesTable()

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Roles</CardTitle>
          <CardDescription>
            Manage user roles and permissions to group users by their access
            level.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RoleTable roles={roles} />
        </CardContent>
      </Card>
    </>
  )
}
