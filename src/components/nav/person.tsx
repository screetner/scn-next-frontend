import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { get2CapitalizedWords } from '@/utils/helper'
import { auth } from '@/auth'
import { LogOut, Settings2 } from 'lucide-react'
import { signOut } from '@/actions/auth'
import { Link } from '@/i18n/routing'

export async function Person() {
  const session = await auth()
  const user = session?.user
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="overflow-hidden rounded-full"
        >
          {get2CapitalizedWords(user?.username)}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <div>
            <Link
              href={'/user-setting'}
              className={'space-x-1 flex items-center'}
            >
              <Settings2 size={'15'} />
              <span>User Settings</span>
            </Link>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <form action={signOut}>
            <Button
              type="submit"
              variant="ghost"
              className="w-full justify-start text-red-500 hover:text-red-700 hover:bg-red-100"
            >
              <span className="mr-2">Logout</span>
              <LogOut className="h-4 w-4" />
            </Button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
