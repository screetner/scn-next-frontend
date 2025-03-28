import { TooltipProvider } from '@/components/ui/tooltip'
import { ModeToggle } from '@/components/ModeToggle'
import { Person } from '@/components/nav/person'
import React from 'react'
import { orgNavLists, adminNavLists } from '@/utils/NavLists'
import NavIcon from '@/components/nav/navIcon'
import SideNav from '@/components/nav/SideNav'
import NavTree from '@/components/nav/NavTree'
import { LanguageChange } from '@/components/LanguageChange'
import { TypographyP } from '@/components/typography/TypographyP'

interface NavProps {
  children: React.ReactNode
  isAdmin: boolean
}

export function Nav({ children, isAdmin }: NavProps) {
  const navList = isAdmin ? adminNavLists : orgNavLists
  return (
    <TooltipProvider>
      <div className="flex h-svh bg-muted/40">
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
          <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
            {navList.map(nav => (
              <NavIcon key={nav.label} nav={nav} />
            ))}
          </nav>
          <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
            <LanguageChange />
            <ModeToggle />
          </nav>
        </aside>
        <div className="flex flex-1 flex-col sm:pl-14">
          <header className="sticky top-0 flex py-2 h-14 items-center justify-between gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-1 sm:px-6">
            <SideNav isAdmin={isAdmin} />
            <NavTree />
            <Person />
          </header>
          <main className="flex-1 overflow-scroll p-2 md:px-6">{children}</main>
          <footer className="bg-background py-1 pr-5 flex justify-end">
            <TypographyP
              text={'© 2024 Screetner. All rights reserved.'}
              className="text-gray-400"
            />
          </footer>
        </div>
      </div>
    </TooltipProvider>
  )
}
