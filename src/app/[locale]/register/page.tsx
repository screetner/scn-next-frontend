import Image from 'next/image'
import RegisterForm from '@/app/[locale]/register/RegisterForm'
import { checkRegisterToken } from '@/actions/register'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { redirect } from '@/i18n/routing'
import { getTranslations } from 'next-intl/server'

interface RegisterPageProps {
  searchParams: { token: string }
}

export default async function RegisterPage({
  searchParams,
}: RegisterPageProps) {
  const { token } = searchParams

  if (!token) {
    redirect('/')
  }

  const { data: tokenExpTime, error } = await checkRegisterToken(token)

  if (error) {
    redirect('/')
  }

  const t = await getTranslations('RegisterPage')

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Image
          className="mx-auto h-12 w-auto"
          src="/logo.png"
          alt="screetner logo"
          width={48}
          height={48}
        />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-foreground">
          {t('title.createAccount')}
        </h2>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          {t('title.or')}{' '}
          <Button variant="link" asChild>
            <a href="/signin" className={'text-blue-400'}>
              {t('title.signIn')}
            </a>
          </Button>
        </p>
      </div>
      <Card className="mt-8 mx-auto w-full max-w-md">
        <CardHeader>
          <CardTitle>{t('Card.title')}</CardTitle>
          <CardDescription>
            {t('Card.description')} {tokenExpTime}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterForm token={token} />
        </CardContent>
      </Card>

      <footer className="mt-8 text-center text-sm text-muted-foreground">
        {t('footer')}
      </footer>
    </div>
  )
}
