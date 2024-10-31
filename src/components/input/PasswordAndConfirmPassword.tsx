'use client'

import React, { useState, useEffect } from 'react'
import { UseFormReturn } from 'react-hook-form'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { PasswordInput } from '@/components/input/PasswordInput'
import { Progress } from '@/components/ui/progress'
import { getStrengthColor } from '@/utils/helper'
import PasswordCriteriaItem from '@/app/[locale]/register/PasswordCriteriaItem'
import { passwordStrengthRegex } from '@/schemas/registerSchema'
import { useTranslations } from 'next-intl'

interface PasswordFieldsProps {
  form: UseFormReturn<any>
  showStrengthMeter?: boolean
}

export function PasswordAndConfirmPassword({
  form,
  showStrengthMeter = true,
}: PasswordFieldsProps) {
  const t = useTranslations('RegisterPage.form')
  const [showCriteria, setShowCriteria] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [passwordCriteria, setPasswordCriteria] = useState({
    length: false,
    lowercase: false,
    uppercase: false,
    number: false,
    special: false,
  })

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

  // Ensure the form has default values for password fields
  useEffect(() => {
    const currentValues = form.getValues()
    if (currentValues.password === undefined) {
      form.setValue('password', '')
    }
    if (currentValues.confirmPassword === undefined) {
      form.setValue('confirmPassword', '')
    }
  }, [form])

  return (
    <>
      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('password')}</FormLabel>
            <FormControl>
              <PasswordInput
                field={{
                  ...field,
                  value: field.value || '',
                }}
                autoComplete="new-password"
                onChange={e => {
                  field.onChange(e)
                  setShowCriteria(true)
                  if(e.target.value === '') {
                    setShowCriteria(false)
                  }
                }}
                placeholder={t('password')}
              />
            </FormControl>
            {showStrengthMeter && showCriteria && (
              <>
                <Progress
                  value={passwordStrength}
                  className={`mt-2 ${getStrengthColor(passwordStrength)}`}
                />
                <ul className="mt-2 space-y-1">
                  <PasswordCriteriaItem
                    label={t('passwordHint.char')}
                    isMet={passwordCriteria.length}
                  />
                  <PasswordCriteriaItem
                    label={t('passwordHint.lower')}
                    isMet={passwordCriteria.lowercase}
                  />
                  <PasswordCriteriaItem
                    label={t('passwordHint.upper')}
                    isMet={passwordCriteria.uppercase}
                  />
                  <PasswordCriteriaItem
                    label={t('passwordHint.number')}
                    isMet={passwordCriteria.number}
                  />
                  <PasswordCriteriaItem
                    label={t('passwordHint.special')}
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
            <FormLabel>{t('confirmPassword')}</FormLabel>
            <FormControl>
              <PasswordInput
                field={{
                  ...field,
                  value: field.value || '',
                }}
                placeholder={t('confirmPassword')}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  )
}
