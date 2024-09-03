import { TNav } from '@/types/navList'
import { Home, LocateFixed, UserRoundCog } from 'lucide-react'
import { Routes } from '@/routes'

export const navList: TNav[] = [
  {
    label: 'Dashboard',
    path: Routes.DASHBOARD,
    icon: <Home className={'h-5 w-5'} />,
  },
  {
    label: 'Geometry',
    path: Routes.GEOMETRY,
    icon: <LocateFixed className={'h-5 w-5'} />,
  },
  {
    label: 'Role',
    path: Routes.ROLE,
    icon: <UserRoundCog className={'h-5 w-5'} />,
  },
]
