import RoleMemberTable from '@/components/table/RoleMemberTable'
import { RoleMember } from '@/types/role'

interface MemberProps {
  roleId: string
  roleName: string
  roleMembers: RoleMember[]
}

export default function Member({ roleMembers, roleId, roleName }: MemberProps) {
  return (
    <>
      <RoleMemberTable
        roleMembers={roleMembers}
        roleId={roleId}
        roleName={roleName}
      />
    </>
  )
}
