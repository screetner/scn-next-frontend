'use client'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { RolesTable } from '@/types/role'
import React from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { User } from 'lucide-react'
import { useRouter } from 'next/navigation'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { fillRoute, Routes } from '@/routes'
import * as action from '@/actions'
import { toast } from 'sonner'
import { useSearchRoleTable } from '@/hooks/role/useSearchRoleTable'

interface RoleTableProps {
  roles: RolesTable[]
}

export default function RoleTable({ roles }: RoleTableProps) {
  const router = useRouter()
  const { setSearchRoles, rolesTable, searchRoles } = useSearchRoleTable(roles)

  const handleCreateRole = (e: React.FormEvent) => {
    e.preventDefault()
    toast.promise(action.createRoleWithRedirect(), {
      loading: 'Creating role...',
      success: 'Role created successfully',
      error: 'Failed to create role',
    })
  }

  const onClickViewMembers = (e: React.MouseEvent, roleId: string) => {
    e.stopPropagation()
    router.push(`${fillRoute(Routes.ROLE_SETTING, roleId)}?tab=members`)
  }

  const onRowClick = (roleId: string) => {
    router.push(`${fillRoute(Routes.ROLE_SETTING, roleId)}?tab=display`)
  }

  return (
    <>
      <div className="flex space-x-4 mb-4">
        <Input
          type="text"
          placeholder="Search roles"
          value={searchRoles}
          onChange={e => setSearchRoles(e.target.value)}
          className="flex-grow"
        />
        <form onSubmit={handleCreateRole}>
          <Button type="submit">Create Role</Button>
        </form>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Role Name</TableHead>
            <TableHead>Members</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rolesTable.map(role => (
            <TableRow
              key={role.roleId}
              onClick={() => onRowClick(role.roleId)}
              className={'hover:cursor-pointer'}
            >
              <TableCell>{role.roleName}</TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  {role.members}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <User
                        onClick={e => onClickViewMembers(e, role.roleId)}
                        className="hover:cursor-pointer"
                      />
                    </TooltipTrigger>
                    <TooltipContent side={'right'}>
                      <p>View Members</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}
