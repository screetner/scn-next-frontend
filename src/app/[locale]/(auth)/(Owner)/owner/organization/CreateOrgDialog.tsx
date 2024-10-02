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
import { toast } from 'sonner'
import { useDialog } from '@/context/DialogProvider'
import {
  CreateOrgFormData,
  createOrgSchema,
} from '@/schemas/OwnerCreateOrgnization'

const createOrganization = async (data: CreateOrgFormData) => {
  await new Promise(resolve => setTimeout(resolve, 1000))
  console.log('Organization created:', data)
  return data
}

export default function CreateOrganizationDialog() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { closeDialog } = useDialog()

  const form = useForm<CreateOrgFormData>({
    resolver: zodResolver(createOrgSchema),
    defaultValues: {
      name: '',
      adminEmails: [],
    },
  })

  const onSubmit = async (data: CreateOrgFormData) => {
    setIsSubmitting(true)
    toast.promise(createOrganization(data), {
      loading: 'Creating organization...',
      success: 'Organization created successfully',
      error: 'Failed to create organization',
    })
    setIsSubmitting(false)
    closeDialog()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Organization Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter organization name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="adminEmails"
          render={({}) => (
            <FormItem>
              <FormLabel>Admin Email Addresses</FormLabel>
              <FormControl>
                <Controller
                  name="adminEmails"
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
