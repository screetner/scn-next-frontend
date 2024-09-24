import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import React from 'react'
import Provider from '@/provider'
const inter = Inter({ subsets: ['latin'] })
import 'mapbox-gl/dist/mapbox-gl.css'
import { Toaster } from '@/components/ui/sonner'

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="Light"
          enableSystem
          disableTransitionOnChange
        >
          <Provider>
            {children}
            <Toaster />
          </Provider>
        </ThemeProvider>
      </body>
    </html>
  )
}
