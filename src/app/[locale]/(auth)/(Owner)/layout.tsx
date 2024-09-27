import { PropsWithChildren } from 'react'
import { redirect } from '@/i18n/routing'
import { auth } from '@/auth'

export default async function AdminLayout({ children }: PropsWithChildren) {
  const session = await auth()
  const isAdmin = session?.user.isOwner
  if (!isAdmin) {
    redirect('/dashboard')
  }
  return children
}
