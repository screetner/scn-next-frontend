import React, { useState } from 'react'
import { RoleMember } from '@/types/role'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Plus, X } from 'lucide-react'
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
import { toast } from 'sonner'
import { useDialog } from '@/context/DialogProvider'
import { UseFetchUnAssignUser } from '@/hooks/role/useFetchUnAssignUser'
import { assignRoleToMember } from '@/actions/role'
import { SkeletonCard } from '@/components/SkeletonCard'
import FormButton from '@/components/Button/FormButton'

interface AddMemberDialogProps {
  roleId: string
}

export default function AddMemberDialog({ roleId }: AddMemberDialogProps) {
  const [selectedMembers, setSelectedMembers] = useState<RoleMember[]>([])
  const [searchValue, setSearchValue] = useState<string>('')
  const { closeDialog } = useDialog()
  const { data: listOfUnRoleMembers, isLoading } = UseFetchUnAssignUser()

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

  const filteredMembers = listOfUnRoleMembers?.filter(
    member =>
      member.username.toLowerCase().includes(searchValue.toLowerCase()) ||
      member.email.toLowerCase().includes(searchValue.toLowerCase()),
  )

  const handleSubmit = async () => {
    const body = {
      userId: selectedMembers.map(member => member.userId),
      roleId: roleId,
    }

    toast.promise(assignRoleToMember(body), {
      loading: 'Assigning role to member...',
      success: 'Role assigned to member successfully',
      error: 'Failed to assign role to member',
    })
    closeDialog()
  }

  if (isLoading) return <SkeletonCard />

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
            {filteredMembers?.map(member => (
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
        {/*<Button type="submit" onClick={handleSubmit}>*/}
        {/*  Add*/}
        {/*</Button>*/}
        <FormButton onSubmit={handleSubmit} icon={<Plus />} text={'Add'} />
      </DialogFooter>
    </div>
  )
}
