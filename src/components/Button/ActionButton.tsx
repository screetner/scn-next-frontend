import React from 'react'
import { Button } from '@/components/ui/button'

interface ActionButtonProps {
  onSubmit: React.FormEventHandler<HTMLFormElement> | undefined
  icon: React.ReactNode
  text: string
}

export default function ActionButton({
  icon,
  text,
  onSubmit,
}: ActionButtonProps) {
  return (
    <form onSubmit={onSubmit}>
      <Button type="submit" className="flex items-center space-x-2">
        {icon && <span className="w-5 h-5">{icon}</span>}
        <span>{text}</span>
      </Button>
    </form>
  )
}
