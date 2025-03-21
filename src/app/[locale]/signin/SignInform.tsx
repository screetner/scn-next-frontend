'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { signInSchema } from '@/schemas/signin'
import { zodResolver } from '@hookform/resolvers/zod'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useState } from 'react'
import { authenticate } from '@/actions/auth'
import { PasswordInput } from '@/components/input/PasswordInput'
import { useRouter } from '@/i18n/routing'
import { useTranslations } from 'next-intl'

export function SignInForm() {
  const t = useTranslations('SignInPage')
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const router = useRouter()
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const handleSubmit = async (values: z.infer<typeof signInSchema>) => {
    setIsSubmitting(true)
    const data = await authenticate(values.username, values.password)
    setIsSubmitting(false)
    if (data.error) {
      form.setError('root', {
        type: 'manual',
        message: data.error,
      })
    } else {
      router.push('/dashboard')
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('form.username')}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder={t('form.username')}
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
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('form.password')}</FormLabel>
              <FormControl>
                <PasswordInput field={field} placeholder={t('form.password')} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting
            ? `${t('form.submitting')}`
            : `${t('form.signInButton')}`}
        </Button>
        {form.formState.errors && (
          <p className="text-red-500 text-sm">
            {form.formState.errors.root?.message}
          </p>
        )}
      </form>
    </Form>
  )
}
