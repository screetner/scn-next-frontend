import { Card, CardHeader } from '@/components/ui/card'
import { Plus } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import React, { useCallback } from 'react'
import { toast } from 'sonner'
import RoleMenu from '@/app/[locale]/(auth)/(Org)/role/[roleId]/setting/menu/RoleMenu'
import { useRoleSetting } from '@/context/RoleSettingContext'
import { createRoleWithRedirect } from '@/actions/role'
import FormButton from '@/components/Button/FormButton'

interface ListRoleProps {
  handleRoleSelect: (roleId: string) => void
}

export default function ListRole({ handleRoleSelect }: ListRoleProps) {
  const { roleId : selectedRoleId } = useRoleSetting()
  const { roleList } = useRoleSetting()
  const onCreateRole = useCallback(() => {
    toast.promise(createRoleWithRedirect(), {
      loading: 'Creating role...',
      success: 'Role created successfully',
      error: 'Failed to create role',
    })
  }, [])

  return (
    <div className={'w-full md:w-1/3 lg:w-1/4 xl:w-1/6'}>
      <Card>
        <CardHeader>
          <FormButton
            onSubmit={onCreateRole}
            icon={<Plus />}
            text={'Create Role'}
            className={'w-full'}
          />
        </CardHeader>
        <Separator />
        <ScrollArea className={'h-[200px] md:h-[750px]'}>
          {roleList.map(role => (
            <div
              key={role.roleId}
              className={cn(
                'cursor-pointer mt-2 w-full px-4 py-2 text-left rounded flex justify-between items-center',
                selectedRoleId === role.roleId
                  ? 'bg-secondary text-secondary-foreground'
                  : 'hover:bg-gray-100',
              )}
              onClick={() => handleRoleSelect(role.roleId)}
            >
              <div>{role.roleName}</div>
              <RoleMenu currentRoleId={selectedRoleId} targetRoleId={role.roleId} />
            </div>
          ))}
        </ScrollArea>
      </Card>
    </div>
  )
}
