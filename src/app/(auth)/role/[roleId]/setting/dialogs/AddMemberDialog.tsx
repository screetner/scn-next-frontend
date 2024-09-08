import React, { useState } from 'react'
import { RoleMember } from '@/types/role'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { X } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Checkbox } from '@/components/ui/checkbox'
import { DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import * as action from '@/actions'
import { useDialog } from '@/context/DialogProvider'

interface AddMemberDialogProps {
  roleId: string
  listOfUnRoleMembers: RoleMember[]
}

export default function AddMemberDialog({
  listOfUnRoleMembers,
  roleId,
}: AddMemberDialogProps) {
  const [selectedMembers, setSelectedMembers] = useState<RoleMember[]>([])
  const [searchValue, setSearchValue] = useState<string>('')
  const { closeDialog } = useDialog()

  const handleToggleMember = (member: RoleMember) => {
    setSelectedMembers(prev =>
      prev.some(m => m.userId === member.userId)
        ? prev.filter(m => m.userId !== member.userId)
        : [...prev, member],
    )
  }

  const handleRemoveMember = (member: RoleMember) => {
    setSelectedMembers(prev => prev.filter(m => m.userId !== member.userId))
  }

  const filteredMembers = listOfUnRoleMembers.filter(
    member =>
      member.username.toLowerCase().includes(searchValue.toLowerCase()) ||
      member.email.toLowerCase().includes(searchValue.toLowerCase()),
  )

  const handleSubmit = async () => {
    const body = {
      userId: selectedMembers.map(member => member.userId),
      roleId: roleId,
    }

    toast.promise(action.assignRoleToMember(body), {
      loading: 'Assigning role to member...',
      success: 'Role assigned to member successfully',
      error: 'Failed to assign role to member',
    })
    closeDialog()
  }

  return (
    <div className="space-y-4">
      <Input
        placeholder="Search members"
        value={searchValue}
        onChange={e => setSearchValue(e.target.value)}
      />
      <div className="flex flex-wrap gap-2">
        {selectedMembers.map(member => (
          <Badge
            key={member.userId}
            variant="secondary"
            className="flex items-center gap-1"
          >
            {member.username}
            <X
              className="h-3 w-3 cursor-pointer"
              onClick={() => handleRemoveMember(member)}
            />
          </Badge>
        ))}
      </div>
      <div className="max-h-[300px] overflow-y-auto border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">Select</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Email</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMembers.map(member => (
              <TableRow key={member.userId}>
                <TableCell>
                  <Checkbox
                    id={member.userId}
                    checked={selectedMembers.some(
                      m => m.userId === member.userId,
                    )}
                    onCheckedChange={() => handleToggleMember(member)}
                  />
                </TableCell>
                <TableCell>
                  <label
                    htmlFor={member.userId}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {member.username}
                  </label>
                </TableCell>
                <TableCell>{member.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <DialogFooter>
        <Button type="submit" onClick={handleSubmit}>
          Add
        </Button>
      </DialogFooter>
    </div>
  )
}
