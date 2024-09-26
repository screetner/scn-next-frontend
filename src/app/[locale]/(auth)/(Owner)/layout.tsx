import { PropsWithChildren } from 'react'
import { redirect } from '@/i18n/routing'
import { isAdmin } from '@/utils/NavLists'

export default function AdminLayout({ children }: PropsWithChildren) {
  if (!isAdmin) {
    redirect('/dashboard')
  }
  return children
}
