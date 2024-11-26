'use client'

import React, { PropsWithChildren } from 'react'
import { SessionProvider } from 'next-auth/react'
import { AlertDialogProvider } from '@/context/AlertDialogContext'
import { DialogProvider } from '@/context/DialogProvider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Toaster } from '@/components/ui/sonner'
import { DrawerProvider } from '@/context/DrawerContext'

export default function Provider({ children }: PropsWithChildren) {
  const queryClient = new QueryClient()
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <AlertDialogProvider>
          <DrawerProvider>
            <DialogProvider>
              <TooltipProvider delayDuration={100}>
                {children}
                <Toaster />
              </TooltipProvider>
            </DialogProvider>
          </DrawerProvider>
        </AlertDialogProvider>
      </QueryClientProvider>
    </SessionProvider>
  )
}
