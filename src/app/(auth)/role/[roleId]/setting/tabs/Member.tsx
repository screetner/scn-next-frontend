import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import MemberTable from '@/app/(auth)/role/[roleId]/setting/tables/MemberTable'
import React from 'react'
import { useSearchMemberTable } from '@/hooks/role/useSearchMemberTable'
import { RoleMember } from '@/types/role'
import { useDialog } from '@/context/DialogProvider'
import AddMemberDialog from '@/app/(auth)/role/[roleId]/setting/dialogs/AddMemberDialog'
import { cn } from '@/lib/utils'

interface MemberProps {
  roleId: string
  roleName: string
  roleMembers: RoleMember[]
}

export default function Member({ roleMembers, roleId, roleName }: MemberProps) {
  const { membersList, setSearchValue, searchValue } =
    useSearchMemberTable(roleMembers)
  const { showDialog } = useDialog()

  return (
    <>
      <div className={'flex space-x-4 mb-2'}>
        <Input
          placeholder={'Search members'}
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
        />
        <Button
          variant="default"
          disabled={roleName.toLowerCase() === 'default'}
          onClick={() =>
            showDialog({
              title: 'Add Member',
              content: <AddMemberDialog roleId={roleId} />,
            })
          }
        >
          <Plus className="mr-2 h-4 w-4" /> Add Member
        </Button>{' '}
      </div>
      <MemberTable members={membersList} roleId={roleId} />
    </>
  )
}
