'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { toast } from 'sonner'
import { TypographyH3 } from '@/components/typography/TypographyH3'
import { Separator } from '@/components/ui/separator'
import { PasswordChangeSchema } from '@/schemas/PasswordChange'
import { PasswordAndConfirmPassword } from '@/components/input/PasswordAndConfirmPassword'

const changePassword = async (data: PasswordChangeSchema) => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000))
  // In a real scenario, you'd make an API call here
  console.log('Password change data:', data)
  return { success: true }
}

export default function Account() {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const form = useForm<PasswordChangeSchema>({
    resolver: zodResolver(PasswordChangeSchema),
    defaultValues: {
      currentPassword: '',
      password: '',
      confirmPassword: '',
    },
  })

  const handleSubmit = async (values: PasswordChangeSchema) => {
    setIsSubmitting(true)
    toast.promise(changePassword(values), {
      loading: 'Changing password...',
      success: 'Password changed successfully',
      error: 'Failed to change password',
    })
    setIsSubmitting(false)
    form.reset()
  }

  return (
    <div className="space-y-6">
      <TypographyH3 text={'Change Password'} />
      <Separator />
      <div className={'max-w-xs'}>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Enter current password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <PasswordAndConfirmPassword form={form} showStrengthMeter={true} />
            <div className="flex justify-end">
              <Button
                type="submit"
                className="max-w-xs"
                disabled={isSubmitting || !form.formState.isValid}
              >
                {isSubmitting ? 'Changing...' : 'Change Password'}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
