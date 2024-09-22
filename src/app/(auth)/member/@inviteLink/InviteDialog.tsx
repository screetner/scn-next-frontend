import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import MultipleSelector from '@/components/ui/MultipleSelector'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { InviteFormData, inviteSchema } from '@/schemas/InviteMemberSchema'
import { toast } from 'sonner'
import { inviteMembers } from '@/actions/member'
import { useDialog } from '@/context/DialogProvider'
import { useFetchRoleOptions } from '@/hooks/role/useFetchRoleOptions'
import { SkeletonCard } from '@/components/SkeletonCard'

export default function InviteDialog() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { data: OPTIONS, isLoading } = useFetchRoleOptions()
  const { closeDialog } = useDialog()

  const form = useForm<InviteFormData>({
    resolver: zodResolver(inviteSchema),
    defaultValues: {
      defaultRoleId: '',
      emails: [],
    },
  })

  const onSubmit = async (data: InviteFormData) => {
    setIsSubmitting(true)
    toast.promise(inviteMembers(data), {
      loading: 'Inviting users...',
      success: 'Users invited successfully',
      error: 'Failed to invite users. Please try again.',
    })
    setIsSubmitting(false)
    closeDialog()
  }

  if (isLoading) return <SkeletonCard />

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="defaultRoleId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Default role for users</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {OPTIONS?.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="emails"
          render={({}) => (
            <FormItem>
              <FormLabel>Email Addresses</FormLabel>
              <FormControl>
                <Controller
                  name="emails"
                  control={form.control}
                  render={({ field }) => (
                    <MultipleSelector
                      defaultOptions={[]}
                      hidePlaceholderWhenSelected
                      customTextCreateItem="Add user email address"
                      placeholder="Enter email addresses"
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
        <div className={'flex justify-end'}>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Inviting...' : 'Invite Users'}
          </Button>
        </div>
      </form>
    </Form>
  )
}
