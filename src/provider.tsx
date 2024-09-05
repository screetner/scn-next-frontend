'use client'

import { PropsWithChildren } from 'react'
import { SessionProvider } from 'next-auth/react'
import { AlertDialogProvider } from '@/context/AlertDialogContext'
import { DialogProvider } from '@/context/DialogProvider'

export default function Provider({ children }: PropsWithChildren) {
  return (
    <SessionProvider>
      <AlertDialogProvider>
        <DialogProvider>{children}</DialogProvider>
      </AlertDialogProvider>
    </SessionProvider>
  )
}
