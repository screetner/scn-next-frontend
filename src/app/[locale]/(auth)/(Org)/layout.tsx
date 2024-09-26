import { PropsWithChildren } from 'react'
import { redirect } from '@/i18n/routing'
import { isAdmin } from '@/utils/NavLists'

export default function OrgLayout({ children }: PropsWithChildren) {
  if (isAdmin) {
    redirect('/admin')
  }
  return children
}
