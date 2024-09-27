import { TNav } from '@/types/navList'
import { Home, LocateFixed, UserRoundCog, UsersRound } from 'lucide-react'
import { fillRoute, Routes } from '@/routes'

export const orgNavLists: TNav[] = [
  {
    label: 'Dashboard',
    path: fillRoute(Routes.DASHBOARD),
    icon: <Home className={'h-5 w-5'} />,
  },
  {
    label: 'Geometry',
    path: fillRoute(Routes.GEOMETRY),
    icon: <LocateFixed className={'h-5 w-5'} />,
  },
  {
    label: 'Member',
    path: fillRoute(Routes.MEMBER),
    icon: <UsersRound className={'h-5 w-5'} />,
  },
  {
    label: 'Role',
    path: fillRoute(Routes.ROLE),
    icon: <UserRoundCog className={'h-5 w-5'} />,
  },
]

export const adminNavLists: TNav[] = [
  {
    label: 'test',
    path: fillRoute(Routes.TEST),
    icon: <Home className={'h-5 w-5'} />,
  },
]

export const isAdmin = true
