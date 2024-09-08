import { RolesTable } from '@/types/role'
import { useEffect, useState } from 'react'

export function useSearchRoleTable(roles: RolesTable[]) {
  const [rolesTable, setRolesTable] = useState<RolesTable[]>(roles)
  const [searchRoles, setSearchRoles] = useState<string>('')

  useEffect(() => {
    setRolesTable(
      roles.filter(role =>
        role.roleName.toLowerCase().includes(searchRoles.toLowerCase()),
      ),
    )
  }, [roles, searchRoles])

  return { rolesTable, setSearchRoles, searchRoles }
}
