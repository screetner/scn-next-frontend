import RoleTable from './RoleTable'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { mockRoles } from '@/types/role'

export default function RoleManagement() {
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
          <RoleTable roles={mockRoles} />
        </CardContent>
      </Card>
    </>
  )
}
