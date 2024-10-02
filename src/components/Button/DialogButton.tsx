'use client'

import React from 'react'
import { useDialog } from '@/context/DialogProvider'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface DialogButtonProps {
  title: string
  icon: React.ReactNode
  content: React.ReactNode
  text: string
  className?: string
}

export default function DialogButton({
  icon,
  text,
  title,
  content,
  className,
}: DialogButtonProps) {
  const { showDialog } = useDialog()
  return (
    <Button
      onClick={() =>
        showDialog({
          title: title,
          content: content,
        })
      }
      className={cn('flex items-center space-x-2', className)}
    >
      {icon && <span className="h-5 w-5">{icon}</span>}
      <span>{text}</span>
    </Button>
  )
}
