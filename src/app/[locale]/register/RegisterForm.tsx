'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { RegisterFormValues, registerSchema } from '@/schemas/registerSchema'
import { toast } from 'sonner'
import { registerUser } from '@/actions/register'
import { Link, useRouter } from '@/i18n/routing'
import { useTranslations } from 'next-intl'
import { PasswordAndConfirmPassword } from '@/components/input/PasswordAndConfirmPassword'

export default function RegisterForm({ token }: { token: string }) {
  const t = useTranslations('RegisterPage.form')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: '',
      password: '',
      confirmPassword: '',
      termsOfService: false,
    },
  })

  const handleSubmit = async (values: RegisterFormValues) => {
    setIsSubmitting(true)
    toast.promise(registerUser(token, values.username, values.password), {
      loading: 'Registering...',
      success: 'Account registered successfully.',
      error: error => error.message,
    })
    setIsSubmitting(false)
    router.push('/signin')
  }

  return (
    <div className="max-w-md mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('username')}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={t('username')}
                    type="text"
                    autoCapitalize="none"
                    autoComplete="username"
                    autoCorrect="off"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <PasswordAndConfirmPassword form={form} showStrengthMeter={true} />
          <FormField
            control={form.control}
            name="termsOfService"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    {t('terms.agree')}{' '}
                    <Link
                      href="/terms"
                      className="text-blue-600 hover:underline"
                    >
                      {t('terms.terms')}
                    </Link>
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting
              ? `${t('registerButton.loading')}`
              : `${t('registerButton.default')}`}
          </Button>
          {form.formState.errors.root && (
            <p className="text-red-500 text-sm">
              {form.formState.errors.root.message}
            </p>
          )}
        </form>
      </Form>
      <p className="mt-4 text-center">
        {t('alreadyHaveAccount.text')}{' '}
        <Link href="/signin" className="text-blue-600 hover:underline">
          {t('alreadyHaveAccount.link')}
        </Link>
      </p>
    </div>
  )
}
