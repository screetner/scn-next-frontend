'use client'

import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import MultipleSelector from '@/components/ui/MultipleSelector'
import {
  InviteAdminFormData,
  inviteAdminSchema,
} from '@/schemas/InviteAdminSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useDialog } from '@/context/DialogProvider'
import { inviteAdmin } from '@/actions/owner/organization'
import { withToastPromise } from '@/utils/toastPromise'

interface InviteAdminDialogProps {
  orgId: string
}

const InviteAdminDialog = ({ orgId }: InviteAdminDialogProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { closeDialog } = useDialog()

  const form = useForm<InviteAdminFormData>({
    resolver: zodResolver(inviteAdminSchema),
    defaultValues: {
      adminEmail: [],
    },
  })

  const onSubmit = async (data: InviteAdminFormData) => {
    setIsSubmitting(true)
    await withToastPromise(() => inviteAdmin(orgId, data), {
      loading: 'Inviting admins...',
      success: 'Admins invited successfully',
      error: err => err.message || 'Failed to invite admins',
    })
    closeDialog()
    setIsSubmitting(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="adminEmail"
          render={() => (
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
          <Button
            type="submit"
            disabled={isSubmitting || !form.formState.isDirty}
          >
            {isSubmitting ? 'Inviting...' : 'Invite Admins'}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default InviteAdminDialog
