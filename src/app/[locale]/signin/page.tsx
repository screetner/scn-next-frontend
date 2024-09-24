import React from 'react'
import { Metadata } from 'next'
import { SignInForm } from './SignInform'
import { auth } from '@/auth'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Link, redirect } from '@/i18n/routing'
import { getTranslations } from 'next-intl/server'

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Sign in to your account',
}

export default async function SignInPage() {
  const session = await auth()
  const t = await getTranslations('SignInPage')
  if (session) {
    redirect('/dashboard')
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            {t('title')}
          </CardTitle>
          <CardDescription className="text-center">
            {t('description')}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <SignInForm />
          <Separator className="my-4" />
        </CardContent>
        <CardFooter>
          <p className="px-8 text-center text-sm text-muted-foreground">
            {t('footer')}{' '}
            <Link href={'/term-of-service'}>
              <span className="underline text-foreground">
                {t('TermsOfService')}
              </span>
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
