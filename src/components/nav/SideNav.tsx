import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { PanelLeft } from 'lucide-react'
import { ModeToggle } from '@/components/ModeToggle'
import { orgNavLists } from '@/utils/NavLists'
import SmallNavItem from '@/components/nav/smallNavItem'

export default function SideNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="sm:hidden">
          <PanelLeft className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="sm:max-w-xs">
        <SheetTitle />
        <SheetDescription />
        <nav className="grid gap-6 text-lg font-medium">
          <ModeToggle />
          {orgNavLists.map(nav => {
            return <SmallNavItem nav={nav} key={nav.label} />
          })}
        </nav>
      </SheetContent>
    </Sheet>
  )
}
