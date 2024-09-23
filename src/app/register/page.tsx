import Image from 'next/image'
import RegisterForm from '@/app/register/RegisterForm'
import { checkRegisterToken } from '@/actions/register'
import { redirect } from 'next/navigation'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'

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

  const { data, error } = await checkRegisterToken(token)

  if (error) {
    redirect('/')
  }

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
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          Or{' '}
          <Button variant="link" asChild>
            <a href="/signin" className={'text-blue-400'}>
              sign in to your existing account
            </a>
          </Button>
        </p>
      </div>
      <Card className="mt-8 mx-auto w-full max-w-md">
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>
            Please fill in the form to create your account. Your token will
            expire on <strong>{data}</strong>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterForm token={token} />
        </CardContent>
      </Card>

      <footer className="mt-8 text-center text-sm text-muted-foreground">
        © 2024 Screetner. All rights reserved.
      </footer>
    </div>
  )
}
