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
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Trash2, MoreVertical } from 'lucide-react'

interface MemberProps {
  members: RoleMember[]
}

const Member: React.FC<MemberProps> = ({ members }) => {
  const onDeleteMember = (e: React.MouseEvent, userId: string) => {
    e.stopPropagation()
    console.log('Delete member:', userId)
  }

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
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-40">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem
                      onClick={e => onDeleteMember(e, member.userId)}
                    >
                      <Trash2 className="mr-2 h-4 w-4 text-red-600" />
                      <span>Delete Member</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default Member
