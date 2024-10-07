import { z } from 'zod'

export const createOrgSchema = z.object({
  orgName: z.string().min(1, 'Organization name is required'),
  adminEmail: z
    .array(z.string().email('Invalid email address'))
    .min(1, 'Please enter at least one admin email')
    .refine(
      emails =>
        emails.every(email => z.string().email().safeParse(email).success),
      {
        message: 'One or more email addresses are invalid',
      },
    ),
})

export type CreateOrgFormData = z.infer<typeof createOrgSchema>
