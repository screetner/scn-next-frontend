import React from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface ActionButtonProps {
  onSubmit: React.FormEventHandler<HTMLFormElement> | undefined
  icon: React.ReactNode
  text: string
  className?: string
}

export default function ActionButton({
  icon,
  text,
  onSubmit,
  className,
}: ActionButtonProps) {
  return (
    <form onSubmit={onSubmit}>
      <Button
        type={'submit'}
        className={cn('flex items-center space-x-2', className)}
      >
        {icon && <span className="h-5 w-5">{icon}</span>}
        <span>{text}</span>
      </Button>
    </form>
  )
}
