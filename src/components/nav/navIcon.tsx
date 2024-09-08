'use client'

import React, { useEffect, useState } from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import Link from 'next/link'
import { TNav } from '@/types/navList'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { cn } from '@/lib/utils'

interface NavIconProps {
  nav: TNav
}

export default function NavIcon({ nav }: NavIconProps) {
  const pathname = usePathname()
  const active = new RegExp(`^${nav.path}`).test(pathname)
  const { theme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const baseClasses =
    'flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8'
  const activeClasses = 'bg-accent text-accent-foreground'
  const inactiveClasses = 'text-muted-foreground'

  let themeClasses = ''
  if (mounted) {
    const currentTheme = theme === 'system' ? systemTheme : theme
    themeClasses =
      !active && currentTheme === 'light'
        ? 'bg-light-theme-color text-dark-icon-color'
        : !active && currentTheme === 'dark'
          ? 'bg-dark-theme-color text-light-icon-color'
          : ''
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          href={nav.path}
          className={cn(
            baseClasses,
            active ? activeClasses : inactiveClasses,
            themeClasses,
          )}
        >
          {nav.icon}
          <span className="sr-only">{nav.label}</span>
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right">{nav.label}</TooltipContent>
    </Tooltip>
  )
}
