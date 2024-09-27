import { PropsWithChildren } from 'react'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { Nav } from '@/components/nav/Nav'

export default async function AuthLayout({ children }: PropsWithChildren) {
  const session = await auth()
  if (!session) {
    redirect('/')
  }
  const isAdmin = session.user.isOwner
  return <>{session && <Nav isAdmin={isAdmin}>{children}</Nav>}</>
}
