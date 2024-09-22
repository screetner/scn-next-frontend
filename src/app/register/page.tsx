import Image from 'next/image'
import RegisterForm from '@/app/register/RegisterForm'
import { checkRegisterToken } from '@/actions/register'
import { redirect } from 'next/navigation'

interface RegisterPageProps {
  searchParams: { token: string }
}

export default async function RegisterPage({
  searchParams,
}: RegisterPageProps) {
  const { token } = searchParams

  const { error } = await checkRegisterToken(token)

  if (error) {
    redirect('/')
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Image
          className="mx-auto h-12 w-auto"
          src="/logo.png"
          alt="screetner logo"
          width={48}
          height={48}
        />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{' '}
          <a
            href="/signin"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            sign in to your existing account
          </a>
        </p>
      </div>

      <div className="mt-8 mx-5 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <RegisterForm />
        </div>
      </div>

      <footer className="mt-8 text-center text-sm text-gray-500">
        © 2024 Screetner. All rights reserved.
      </footer>
    </div>
  )
}
