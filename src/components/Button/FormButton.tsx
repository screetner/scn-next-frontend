import React from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface FormButtonProps {
  onSubmit: React.FormEventHandler<HTMLFormElement> | undefined
  icon: React.ReactNode
  text: string
  className?: string
  disabled?: boolean
}

export default function FormButton({
  icon,
  text,
  onSubmit,
  className,
  disabled,
}: FormButtonProps) {
  return (
    <form onSubmit={onSubmit}>
      <Button
        disabled={disabled}
        type={'submit'}
        className={cn('flex items-center space-x-2', className)}
      >
        {icon && <span className="h-5 w-5">{icon}</span>}
        <span>{text}</span>
      </Button>
    </form>
  )
}
