import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import MultipleSelector, { Option } from '@/components/ui/MultipleSelector'
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

const OPTIONS: Option[] = [
  { value: '1', label: 'Admin' },
  { value: '2', label: 'Default' },
]

export default function InviteDialog() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<InviteFormData>({
    resolver: zodResolver(inviteSchema),
    defaultValues: {
      DefaultRoleId: '',
      emails: [],
    },
  })

  const onSubmit = async (data: InviteFormData) => {
    setIsSubmitting(true)
    console.log(data)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSubmitting(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="DefaultRoleId"
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
                  {OPTIONS.map(option => (
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
