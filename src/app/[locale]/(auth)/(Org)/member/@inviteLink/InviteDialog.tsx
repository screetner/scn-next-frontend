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
import { inviteMembers } from '@/actions/member'
import { useDialog } from '@/context/DialogProvider'
import { useFetchRoleOptions } from '@/hooks/role/useFetchRoleOptions'
import { SkeletonCard } from '@/components/SkeletonCard'
import { useTranslations } from 'next-intl'
import { withToastPromise } from '@/utils/toastPromise'

export default function InviteDialog() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const t = useTranslations('MemberPage.inviteLink.dialog')
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
    await withToastPromise(() => inviteMembers(data), {
      loading: 'Inviting users...',
      success: 'Users invited successfully',
      error: err => err.message || 'Failed to invite users',
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
              <FormLabel>{t('defaultRoleLabel')}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={t('defaultRolePlaceholder')} />
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
              <FormLabel>{t('emailLabel')}</FormLabel>
              <FormControl>
                <Controller
                  name="emails"
                  control={form.control}
                  render={({ field }) => (
                    <MultipleSelector
                      defaultOptions={[]}
                      hidePlaceholderWhenSelected
                      customTextCreateItem={t('emailCreateItem')}
                      placeholder={t('emailPlaceholder')}
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
            {t('submitButton', { isSubmitting: isSubmitting })}
          </Button>
        </div>
      </form>
    </Form>
  )
}
