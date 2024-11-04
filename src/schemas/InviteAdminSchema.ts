import { z } from 'zod'

export const inviteAdminSchema = z.object({
  adminEmail: z
    .array(z.string().email('Invalid email address'))
    .min(1, 'Please enter at least one email address')
    .refine(
      emails =>
        emails.every(email => z.string().email().safeParse(email).success),
      {
        message: 'One or more email addresses are invalid',
      },
    ),
})

export type InviteAdminFormData = z.infer<typeof inviteAdminSchema>
