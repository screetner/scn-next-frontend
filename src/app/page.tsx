import { auth } from '@/auth'
import Link from 'next/link'
import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TypographyH2 } from '@/components/typography/TypographyH2'
import { TypographyP } from '@/components/typography/TypographyP'
import { LayoutDashboard, LogIn, MapPin, Camera, FileText } from 'lucide-react'
import { GithubSVG } from '@/components/svg/githubSVG'
import { ModeToggle } from '@/components/ModeToggle'

export default async function Home() {
  const session = await auth()

  return (
    <div className="min-h-screen flex flex-col">
      <header className="container mx-auto px-6 py-4">
        <nav className="flex justify-between items-center">
          <TypographyH2 text="Screetner" className="text-2xl font-bold" />
          <div className="flex space-x-4 items-center">
            <Link href="https://github.com/screetner" target="_blank">
              <GithubSVG />
            </Link>
            <ModeToggle />
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-6 py-16 flex-grow">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <TypographyH2
            text="Screetner: Urban Asset Management Made Simple"
            className="text-4xl font-bold mb-4"
          />
          <TypographyP
            text="A cutting-edge street scanning system to help cities manage their infrastructure effortlessly."
            className="text-lg mb-8 max-w-2xl mx-auto"
          />
          {session ? (
            <Link href={'/dashboard'}>
              <Button size="lg" className="px-6 py-3 space-x-1">
                Go to Dashboard
                <LayoutDashboard className={'w-5 h-5'} />
              </Button>
            </Link>
          ) : (
            <Link href={'/signin'}>
              <Button size="lg" className="px-6 py-3 space-x-1">
                Login
                <LogIn className={'w-5 h-5'} />
              </Button>
            </Link>
          )}
        </section>

        {/* Features Section */}
        <section className="grid md:grid-cols-3 gap-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <MapPin className="w-8 h-8 text-blue-600" />
              <CardTitle className="mt-2">Urban Asset Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <TypographyP text="Monitor and manage urban infrastructure such as roads, signs, and utilities using our real-time tracking system." />
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Camera className="w-8 h-8 text-blue-600" />
              <CardTitle className="mt-2">Street Scanning</CardTitle>
            </CardHeader>
            <CardContent>
              <TypographyP text="Our system uses advanced scanning technology to collect detailed street-level imagery for analysis." />
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <FileText className="w-8 h-8 text-blue-600" />
              <CardTitle className="mt-2">Reporting & Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <TypographyP text="Generate comprehensive reports and insights to help you plan and prioritize infrastructure maintenance." />
            </CardContent>
          </Card>
        </section>

        {/* Contributors Section */}
        <section className="mt-16 text-center">
          <TypographyH2
            text="Our Contributors"
            className="text-2xl font-semibold mb-4"
          />
          <div className="flex flex-wrap justify-center gap-4">
            {['AuJung', 'Quercussi', 'ball46'].map((name, index) => (
              <Badge key={index} className="bg-blue-600 text-white">
                {name}
              </Badge>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 py-6 text-center">
        <TypographyP
          text="© 2024 Screetner. All rights reserved."
          className="text-gray-400"
        />
      </footer>
    </div>
  )
}
