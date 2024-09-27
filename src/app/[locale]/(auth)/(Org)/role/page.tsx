import RoleTable from './RoleTable'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { AddMemberAlert } from '@/app/[locale]/(auth)/(Org)/role/AddMemberAlert'
import { getRolesTable } from '@/actions/role'

export default async function RoleManagement() {
  const roles = await getRolesTable()

  return (
    <>
      <AddMemberAlert className={'mb-3'} />
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
