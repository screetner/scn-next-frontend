'use client'

import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Switch } from '@/components/ui/switch'
import {
  RolePermissions,
  rolePermissionsSchema,
} from '@/schemas/rolePermissions'
import { permissionsConfig } from '@/config/permissionsConfig'
import {
  PermissionField,
  PermissionResponse,
  PermissionSection,
} from '@/types/role'
import { toast } from 'sonner'
import { updateRolePermissions } from '@/actions/role'
import { ScrollArea } from '@/components/ui/scroll-area'

type NestedDefaults = {
  [key: string]: boolean | NestedDefaults
}

const generateNestedDefaults = (section: PermissionSection): NestedDefaults => {
  return Object.entries(section).reduce<NestedDefaults>((acc, [key, value]) => {
    if (typeof value === 'object' && !('defaultValue' in value)) {
      acc[key] = generateNestedDefaults(value as PermissionSection)
    } else {
      acc[key] = (value as PermissionField).defaultValue
    }
    return acc
  }, {})
}

const generateDefaultValues = (): RolePermissions => {
  const defaultValues = {} as RolePermissions

  Object.keys(permissionsConfig).forEach(sectionKey => {
    defaultValues[sectionKey.toLowerCase()] = generateNestedDefaults(
      permissionsConfig[sectionKey],
    )
  })

  return defaultValues
}

interface RolePermissionsProps {
  roleId: string
  data: PermissionResponse
}

export function RolePermissionsForm({ data, roleId }: RolePermissionsProps) {
  const [defaultValues, setDefaultValues] = useState<RolePermissions | null>(
    null,
  )

  const form = useForm<RolePermissions>({
    resolver: zodResolver(rolePermissionsSchema),
    defaultValues: generateDefaultValues(),
  })

  const { reset } = form

  useEffect(() => {
    const parsedData = rolePermissionsSchema.parse(data)
    setDefaultValues(parsedData)
    reset(parsedData)
  }, [data, reset])

  if (!defaultValues) {
    return (
      <div className="text-center text-sm text-muted-foreground">
        Loading...
      </div>
    )
  }

  async function onSubmit(data: RolePermissions) {
    toast.promise(updateRolePermissions(roleId, data), {
      loading: 'Updating permissions...',
      success: 'Permissions updated successfully',
      error: 'Failed to update permissions',
    })
  }

  const renderPermissions = (
    sectionKey: string,
    permissions: Record<string, any>,
    parentKey = '',
  ) => {
    return Object.entries(permissions).map(([key, value]) => {
      const fullKey = parentKey ? `${parentKey}.${key}` : key
      if (typeof value === 'object' && !('defaultValue' in value)) {
        return (
          <div key={fullKey} className="mb-4">
            <h4 className="mb-2 text-md font-semibold capitalize text-muted-foreground">
              {key}
            </h4>
            <div className="pl-4">
              {renderPermissions(sectionKey, value, fullKey)}
            </div>
          </div>
        )
      }

      return (
        <FormField
          key={fullKey}
          control={form.control}
          name={`${sectionKey.toLowerCase()}.${fullKey}`}
          render={({ field }) => (
            <FormItem className="flex items-center justify-between p-4 border rounded-lg space-y-1 bg-card mt-2">
              <div>
                <FormLabel className="text-sm font-medium capitalize text-foreground">
                  {key.replace(/([A-Z])/g, ' $1')}
                </FormLabel>
                <FormDescription className="text-xs text-muted-foreground">
                  {value.description}
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value as boolean}
                  onCheckedChange={field.onChange}
                  className="ml-4"
                />
              </FormControl>
            </FormItem>
          )}
        />
      )
    })
  }

  return (
    <ScrollArea>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {Object.keys(permissionsConfig).map(sectionKey => (
            <div key={sectionKey} className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground capitalize">{`${sectionKey.replace('_', ' ')} Permissions`}</h3>
              {renderPermissions(sectionKey, permissionsConfig[sectionKey])}
            </div>
          ))}
          <div className="flex justify-end">
            <Button
              type="submit"
              className="mt-4"
              disabled={!form.formState.isDirty}
            >
              Save Permissions
            </Button>
          </div>
        </form>
      </Form>
    </ScrollArea>
  )
}
