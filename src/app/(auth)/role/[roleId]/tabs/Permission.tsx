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
import { PermissionResponse } from '@/types/role'

const generateDefaultValues = (): RolePermissions => {
  const defaultValues = {} as RolePermissions

  Object.keys(permissionsConfig).forEach(sectionKey => {
    defaultValues[sectionKey.toLowerCase()] = Object.keys(
      permissionsConfig[sectionKey],
    ).reduce(
      (acc, permission) => {
        acc[permission] = permissionsConfig[sectionKey][permission].defaultValue
        return acc
      },
      {} as Record<string, boolean>,
    )
  })

  return defaultValues
}

interface RolePermissionsProps {
  data: PermissionResponse
}

export function RolePermissionsForm({ data }: RolePermissionsProps) {
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
    return <div>Loading...</div>
  }

  function onSubmit(data: RolePermissions) {
    console.log('Submitted data:', data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        {Object.keys(permissionsConfig).map(sectionKey => (
          <div key={sectionKey}>
            <h3 className="mb-4 text-lg font-medium">{`${sectionKey.replace('_', ' ')} Permissions`}</h3>
            <div className="space-y-4">
              {Object.keys(permissionsConfig[sectionKey]).map(permission => (
                <FormField
                  key={permission}
                  control={form.control}
                  name={`${sectionKey.toLowerCase()}.${permission}`}
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base capitalize">
                          {`${permission.replace(/([A-Z])/g, ' $1')}`}
                        </FormLabel>
                        <FormDescription>
                          {
                            permissionsConfig[sectionKey][permission]
                              .description
                          }
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value as boolean}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              ))}
            </div>
          </div>
        ))}
        <Button type="submit">Save Permissions</Button>
      </form>
    </Form>
  )
}
