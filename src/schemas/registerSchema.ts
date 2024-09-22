import { z } from 'zod'

export const passwordStrengthRegex = {
  lowercase: /[a-z]/,
  uppercase: /[A-Z]/,
  number: /[0-9]/,
  special: /[^A-Za-z0-9]/,
}

export const registerSchema = z
  .object({
    username: z.string().min(3, 'Username must be at least 3 characters'),
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
    confirmPassword: z.string(),
    termsOfService: z.boolean().refine(value => value, {
      message: 'You must accept the terms of service',
    }),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

export type RegisterFormValues = z.infer<typeof registerSchema>
