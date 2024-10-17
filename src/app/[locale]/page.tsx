'use server'

import { auth } from '@/auth'
import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TypographyH2 } from '@/components/typography/TypographyH2'
import { TypographyP } from '@/components/typography/TypographyP'
import { LayoutDashboard, LogIn, MapPin, Camera, FileText } from 'lucide-react'
import { GithubSVG } from '@/components/svg/githubSVG'
import { ModeToggle } from '@/components/ModeToggle'
import { Link } from '@/i18n/routing'
import { getTranslations } from 'next-intl/server'
import { LanguageChange } from '@/components/LanguageChange'
import { Person } from '@/components/nav/person'

export default async function Home() {
  const session = await auth()
  const isOwner = session?.user.isOwner
  const dashboardPath = isOwner ? '/owner' : '/dashboard'
  const t = await getTranslations('HomePage')

  return (
    <div className="min-h-screen flex flex-col">
      <header className="container mx-auto px-6 py-4">
        <nav className="flex justify-between items-center">
          <TypographyH2 text="Screetner" className="text-2xl font-bold" />
          <div className="flex space-x-4 items-center">
            <Link
              href="https://github.com/screetner"
              target="_blank"
              aria-label={'github'}
            >
              <GithubSVG />
            </Link>
            <LanguageChange side={'bottom'} />
            <ModeToggle />
            {session && <Person />}
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-6 py-16 flex-grow">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <TypographyH2
            text={t('title')}
            className="sm:text-4xl font-bold mb-4"
          />
          <TypographyP
            text={t('description')}
            className="sm:text-lg mb-8 max-w-2xl mx-auto"
          />
          {session ? (
            <Link href={dashboardPath}>
              <Button
                size="lg"
                className="px-6 py-3 space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition-colors duration-300 shadow-lg hover:shadow-xl"
              >
                <span>{t('dashboardButton')}</span>
                <LayoutDashboard className={'w-5 h-5'} />
              </Button>
            </Link>
          ) : (
            <Link href={'/signin'}>
              <Button
                size="lg"
                className="px-6 py-3 space-x-2 bg-green-700 hover:bg-green-800 text-white font-semibold rounded-full transition-colors duration-300 shadow-lg hover:shadow-xl"
              >
                <span>{t('loginButton')}</span>
                <LogIn className="w-5 h-5" />
              </Button>
            </Link>
          )}
        </section>

        {/* Features Section */}
        <section className="grid md:grid-cols-3 gap-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <MapPin className="w-8 h-8 text-blue-600" />
              <CardTitle className="mt-2">
                {t('features.urbanAssetTracking.title')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <TypographyP
                text={t('features.urbanAssetTracking.description')}
              />
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Camera className="w-8 h-8 text-blue-600" />
              <CardTitle className="mt-2">
                {t('features.streetScanning.title')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <TypographyP text={t('features.streetScanning.description')} />
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <FileText className="w-8 h-8 text-blue-600" />
              <CardTitle className="mt-2">
                {t('features.reportingAnalytics.title')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <TypographyP
                text={t('features.reportingAnalytics.description')}
              />
            </CardContent>
          </Card>
        </section>

        {/* Contributors Section */}
        <section className="mt-16 text-center">
          <TypographyH2
            text={t('contributorsTitle')}
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
        <TypographyP text={t('footerText')} className="text-gray-400" />
      </footer>
    </div>
  )
}
