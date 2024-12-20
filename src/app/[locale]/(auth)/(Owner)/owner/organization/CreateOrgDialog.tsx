import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import MultipleSelector from '@/components/ui/MultipleSelector'
import { useDialog } from '@/context/DialogProvider'
import {
  CreateOrgFormData,
  createOrgSchema,
} from '@/schemas/OwnerCreateOrgnization'
import { createOrganization } from '@/actions/owner/organization'
import { withToastPromise } from '@/utils/toastPromise'

export default function CreateOrganizationDialog() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { closeDialog } = useDialog()

  const form = useForm<CreateOrgFormData>({
    resolver: zodResolver(createOrgSchema),
    defaultValues: {
      orgName: '',
      adminEmail: [],
    },
  })

  const onSubmit = async (data: CreateOrgFormData) => {
    setIsSubmitting(true)
    await withToastPromise(() => createOrganization(data), {
      loading: 'Creating organization...',
      success: 'Organization created successfully',
      error: err => err.message || 'Failed to create organization',
    })
    setIsSubmitting(false)
    closeDialog()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="orgName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Organization Name * </FormLabel>
              <FormControl>
                <Input placeholder="Enter organization name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="adminEmail"
          render={({}) => (
            <FormItem>
              <FormLabel>Admin Email Addresses</FormLabel>
              <FormControl>
                <Controller
                  name="adminEmail"
                  control={form.control}
                  render={({ field }) => (
                    <MultipleSelector
                      defaultOptions={[]}
                      hidePlaceholderWhenSelected
                      customTextCreateItem="Add admin email address"
                      placeholder="Enter admin email addresses"
                      creatable
                      onChange={value =>
                        field.onChange(value.map(v => v.value))
                      }
                    />
                  )}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Creating...' : 'Create Organization'}
          </Button>
        </div>
      </form>
    </Form>
  )
}
