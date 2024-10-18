import z from 'zod'
import { passwordStrengthRegex } from '@/schemas/registerSchema'

export const PasswordChangeSchema = z
  .object({
    currentPassword: z.string().min(1, 'Current password is required'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(passwordStrengthRegex.lowercase, 'Must contain a lowercase letter')
      .regex(
        passwordStrengthRegex.uppercase,
        'Must contain an uppercase letter',
      )
      .regex(passwordStrengthRegex.number, 'Must contain a number')
      .regex(passwordStrengthRegex.special, 'Must contain a special character'),
    confirmPassword: z.string().min(1, 'Confirm password is required'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
  })

export type PasswordChangeSchema = z.infer<typeof PasswordChangeSchema>
