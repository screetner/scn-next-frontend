'use client'

import { SquareArrowOutUpRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useDialog } from '@/context/DialogProvider'
import InviteDialog from '@/app/[locale]/(auth)/(Org)/member/@inviteLink/InviteDialog'
import { useTranslations } from 'next-intl'

export default function InviteButton() {
  const { showDialog } = useDialog()
  const t = useTranslations('MemberPage.inviteLink')
  const handleInvite = () => {
    showDialog({
      title: t('dialog.inviteDialogTitle'),
      content: <InviteDialog />,
    })
  }
  return (
    <>
      <Button size="sm" className="ml-auto gap-1" onClick={handleInvite}>
        <SquareArrowOutUpRight className={'w-4 h-4'} /> {t('inviteButton')}
      </Button>
    </>
  )
}
