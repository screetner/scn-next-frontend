import MemberTable from '@/components/table/MemberTable'
import { RoleMember } from '@/types/role'

interface MemberProps {
  roleId: string
  roleName: string
  roleMembers: RoleMember[]
}

export default function Member({ roleMembers, roleId, roleName }: MemberProps) {
  return (
    <>
      <MemberTable
        roleMembers={roleMembers}
        roleId={roleId}
        roleName={roleName}
      />
    </>
  )
}
