'use client'

import { PropsWithChildren } from 'react'
import { SessionProvider } from 'next-auth/react'
import { AlertDialogProvider } from '@/context/AlertDialogContext'

export default function Provider({ children }: PropsWithChildren) {
  return (
    <SessionProvider>
      <AlertDialogProvider>{children}</AlertDialogProvider>
    </SessionProvider>
  )
}
