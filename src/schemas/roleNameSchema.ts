import { z } from 'zod'

export const roleSchema = z.object({
  roleName: z.string().min(1, 'Role name is required'),
})

export type RoleSchema = z.infer<typeof roleSchema>
