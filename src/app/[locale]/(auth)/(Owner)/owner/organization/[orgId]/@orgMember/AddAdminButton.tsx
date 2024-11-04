'use client'

import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { useDialog } from '@/context/DialogProvider'
import InviteAdminDialog from '@/app/[locale]/(auth)/(Owner)/owner/organization/[orgId]/@orgMember/AddAdminDialog'

interface AddAdminButtonProps {
  orgId: string
}

export default function AddAdminButton({ orgId }: AddAdminButtonProps) {
  {
    const { showDialog } = useDialog()
    return (
      <Button
        onClick={() => {
          showDialog({
            title: 'Invite Admin',
            content: <InviteAdminDialog orgId={orgId} />,
          })
        }}
      >
        <Plus /> Invite Admin
      </Button>
    )
  }
}
