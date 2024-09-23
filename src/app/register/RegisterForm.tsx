'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'

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
import { Progress } from '@/components/ui/progress'
import { PasswordInput } from '@/components/input/PasswordInput'
import {
  passwordStrengthRegex,
  RegisterFormValues,
  registerSchema,
} from '@/schemas/registerSchema'
import { getStrengthColor } from '@/utils/helper'
import PasswordCriteriaItem from '@/app/register/PasswordCriteriaItem'
import { toast } from 'sonner'
import { registerUser } from '@/actions/register'

export default function RegisterForm({ token }: { token: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showCriteria, setShowCriteria] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [passwordCriteria, setPasswordCriteria] = useState({
    length: false,
    lowercase: false,
    uppercase: false,
    number: false,
    special: false,
  })
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
      error: 'Failed to register account. Please try again.',
    })
    setIsSubmitting(false)
  }

  const calculatePasswordStrength = (password: string) => {
    const criteria = {
      length: password.length >= 8,
      lowercase: passwordStrengthRegex.lowercase.test(password),
      uppercase: passwordStrengthRegex.uppercase.test(password),
      number: passwordStrengthRegex.number.test(password),
      special: passwordStrengthRegex.special.test(password),
    }
    setPasswordCriteria(criteria)

    const strength = Object.values(criteria).filter(Boolean).length
    return (strength / 5) * 100
  }

  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === 'password') {
        setPasswordStrength(calculatePasswordStrength(value.password || ''))
      }
    })
    return () => subscription.unsubscribe()
  }, [form])

  return (
    <div className="max-w-md mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Username"
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput
                    field={field}
                    autoComplete="new-password"
                    onChange={() => setShowCriteria(true)}
                  />
                </FormControl>
                {showCriteria && (
                  <>
                    <Progress
                      value={passwordStrength}
                      className={`mt-2 ${getStrengthColor(passwordStrength)}`}
                    />
                    <ul className="mt-2 space-y-1">
                      <PasswordCriteriaItem
                        label="At least 8 characters long"
                        isMet={passwordCriteria.length}
                      />
                      <PasswordCriteriaItem
                        label="At least one lowercase letter"
                        isMet={passwordCriteria.lowercase}
                      />
                      <PasswordCriteriaItem
                        label="At least one uppercase letter"
                        isMet={passwordCriteria.uppercase}
                      />
                      <PasswordCriteriaItem
                        label="At least one number"
                        isMet={passwordCriteria.number}
                      />
                      <PasswordCriteriaItem
                        label="At least one special character"
                        isMet={passwordCriteria.special}
                      />
                    </ul>
                  </>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <PasswordInput field={field} placeholder="Confirm Password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
                    I accept the{' '}
                    <Link
                      href="/terms"
                      className="text-blue-600 hover:underline"
                    >
                      terms of service
                    </Link>
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Registering...' : 'Register'}
          </Button>
          {form.formState.errors.root && (
            <p className="text-red-500 text-sm">
              {form.formState.errors.root.message}
            </p>
          )}
        </form>
      </Form>
      <p className="mt-4 text-center">
        Already have an account?{' '}
        <Link href="/signin" className="text-blue-600 hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  )
}
