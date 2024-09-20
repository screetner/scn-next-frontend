import React from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

interface ToolTipProps {
  children: React.ReactNode
  content: React.ReactNode | string
  side?: 'top' | 'right' | 'bottom' | 'left'
}

export default function ToolTip({
  children,
  content,
  side = 'right',
}: ToolTipProps) {
  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent side={side}>
          {typeof content === 'string' ? <p>{content}</p> : content}
        </TooltipContent>
      </Tooltip>
    </>
  )
}
