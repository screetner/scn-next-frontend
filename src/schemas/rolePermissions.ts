import { z } from 'zod'
import { permissionsConfig } from '@/config/permissionsConfig'

// Helper function to create a section schema
const createSectionSchema = (
  section: Record<string, { defaultValue: boolean }>,
) => {
  const schemaShape: Record<string, z.ZodDefault<z.ZodBoolean>> = {}
  Object.keys(section).forEach(key => {
    schemaShape[key] = z.boolean().default(section[key].defaultValue)
  })
  return z.object(schemaShape)
}

// Generate the role permissions schema using the configuration
export const rolePermissionsSchema = z.object(
  Object.keys(permissionsConfig).reduce(
    (acc, section) => {
      acc[section.toLowerCase()] = createSectionSchema(
        permissionsConfig[section],
      ) // Convert section keys to lowercase to match the expected API response structure
      return acc
    },
    {} as Record<
      string,
      z.ZodObject<Record<string, z.ZodDefault<z.ZodBoolean>>>
    >,
  ),
)

export type RolePermissions = z.infer<typeof rolePermissionsSchema>
