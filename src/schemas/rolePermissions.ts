import { z } from 'zod'
import { permissionsConfig } from '@/config/permissionsConfig'

const createNestedSchema = (section: Record<string, any>): z.ZodObject<any> => {
  const schemaShape: Record<string, any> = {}
  Object.entries(section).forEach(([key, value]) => {
    if (typeof value === 'object' && !('defaultValue' in value)) {
      schemaShape[key] = createNestedSchema(value)
    } else {
      schemaShape[key] = z.boolean().default(value.defaultValue)
    }
  })
  return z.object(schemaShape)
}

export const rolePermissionsSchema = z.object(
  Object.keys(permissionsConfig).reduce(
    (acc, section) => {
      acc[section.toLowerCase()] = createNestedSchema(
        permissionsConfig[section],
      )
      return acc
    },
    {} as Record<string, z.ZodObject<any>>,
  ),
)

export type RolePermissions = z.infer<typeof rolePermissionsSchema>
