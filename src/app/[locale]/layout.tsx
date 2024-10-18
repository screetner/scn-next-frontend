import type { Metadata } from 'next'
import { Sarabun } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import React from 'react'
import Provider from '@/provider'
const sarabun = Sarabun({
  subsets: ['thai', 'latin'],
  weight: ['400', '500', '700'],
})
import { Toaster } from '@/components/ui/sonner'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'

export const metadata: Metadata = {
  title: 'Screetner',
  description: 'Screetner is a asset management system',
  icons: [
    {
      rel: 'icon',
      url: '/logo.png',
    },
  ],
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const messages = await getMessages()
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={sarabun.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="Light"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider messages={messages}>
            <Provider>
              {children}
              <Toaster />
            </Provider>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
