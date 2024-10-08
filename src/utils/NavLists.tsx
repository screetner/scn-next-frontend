import { TNav } from '@/types/navList'
import {
  Building2,
  Home,
  LocateFixed,
  UserRoundCog,
  UsersRound,
} from 'lucide-react'
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
    label: 'Dashboard',
    path: fillRoute(Routes.OWNER_DASHBOARD),
    icon: <Home className={'h-5 w-5'} />,
  },
  {
    label: 'Organization',
    path: fillRoute(Routes.OWNER_ORGANIZATION),
    icon: <Building2 className={'h-5 w-5'} />,
  },
]

export const isAdmin = true
