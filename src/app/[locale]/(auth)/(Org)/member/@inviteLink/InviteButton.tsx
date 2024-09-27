'use client'

import { SquareArrowOutUpRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useDialog } from '@/context/DialogProvider'
import InviteDialog from '@/app/[locale]/(auth)/(Org)/member/@inviteLink/InviteDialog'

export default function InviteButton() {
  const { showDialog } = useDialog()
  const handleInvite = () => {
    showDialog({
      title: 'Invite new member',
      content: <InviteDialog />,
    })
  }
  return (
    <>
      <Button size="sm" className="ml-auto gap-1" onClick={handleInvite}>
        <SquareArrowOutUpRight className={'w-4 h-4'} /> Invite
      </Button>
    </>
  )
}
