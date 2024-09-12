'use client'

import { PropsWithChildren } from 'react'
import { SessionProvider } from 'next-auth/react'
import { AlertDialogProvider } from '@/context/AlertDialogContext'
import { DialogProvider } from '@/context/DialogProvider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export default function Provider({ children }: PropsWithChildren) {
  const queryClient = new QueryClient()
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <AlertDialogProvider>
          <DialogProvider>{children}</DialogProvider>
        </AlertDialogProvider>
      </QueryClientProvider>
    </SessionProvider>
  )
}
