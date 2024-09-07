'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { roleSchema, RoleSchema } from '@/schemas/roleNameSchema'
import * as action from '@/actions'
import { toast } from 'sonner'

interface EditRoleProps {
  roleId: string
  initialRoleName: string
}

export function EditRoleNameForm({ roleId, initialRoleName }: EditRoleProps) {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const form = useForm<RoleSchema>({
    resolver: zodResolver(roleSchema),
    defaultValues: {
      roleName: initialRoleName,
    },
  })

  const handleSubmit = async (values: RoleSchema) => {
    setIsSubmitting(true)
    toast.promise(action.updateRoleName(values.roleName, roleId), {
      loading: 'Saving...',
      success: 'Role name updated',
      error: err => err.message,
    })
    setIsSubmitting(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="roleName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Role Name" type="text" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save Changes'}
        </Button>
        {form.formState.errors && (
          <p className="text-red-500 text-sm">
            {form.formState.errors.root?.message}
          </p>
        )}
      </form>
    </Form>
  )
}
