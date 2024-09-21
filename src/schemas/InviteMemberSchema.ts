import { z } from 'zod'

export const inviteSchema = z.object({
  defaultRoleId: z.string().min(1, 'Please select a role'),
  emails: z
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
export type InviteFormData = z.infer<typeof inviteSchema>
