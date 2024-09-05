import { RoleMember } from '@/types/role'
import { useEffect, useState } from 'react'

export function useSearchMemberTable(members: RoleMember[]) {
  const [membersList, setMembersList] = useState<RoleMember[]>(members)
  const [searchValue, setSearchValue] = useState<string>('')

  useEffect(() => {
    if (searchValue === '') {
      setMembersList(members)
    } else {
      const filteredMembers = members.filter(member => {
        return member.username.toLowerCase().includes(searchValue.toLowerCase())
      })
      setMembersList(filteredMembers)
    }
  }, [members, searchValue])

  return { membersList, searchValue, setSearchValue }
}
