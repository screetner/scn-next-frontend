import React from 'react'
import { RoleMember } from '@/types/role'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table'
import MemberMenu from '@/app/(auth)/role/[roleId]/setting/menu/memberMenu'

interface MemberProps {
  roleId: string
  members: RoleMember[]
}

const MemberTable: React.FC<MemberProps> = ({ members, roleId }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Username</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>{''}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {members.map(member => (
          <TableRow key={member.userId} className="hover:cursor-pointer">
            <TableCell>{member.username}</TableCell>
            <TableCell>
              <div className="flex items-center gap-1">{member.email}</div>
            </TableCell>
            <TableCell>
              <MemberMenu roleId={roleId} userId={member.userId} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default MemberTable
