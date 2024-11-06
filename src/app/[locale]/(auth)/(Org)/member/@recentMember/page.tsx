import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RotateCcw } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import ToolTip from '@/components/ToolTip'
import dayjs from 'dayjs'
import { getRecentMembers } from '@/actions/member'
import { revalidateTag } from 'next/cache'
import { TypographyP } from '@/components/typography/TypographyP'
import { getTranslations } from 'next-intl/server'

export default async function RecentMember() {
  const { data: recentMember, error } = await getRecentMembers(8)
  const t = await getTranslations('MemberPage.recentMember')
  const t2 = await getTranslations('MemberPage')

  const revalidateRecentMember = async () => {
    'use server'
    revalidateTag('@recentMember')
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="grid gap-1">
          <CardTitle className="text-lg font-semibold">{t('title')}</CardTitle>
          <CardDescription className="text-sm text-gray-500">
            {t('description')}
          </CardDescription>
        </div>
        <ToolTip content={'Refresh'} side={'top'}>
          <form action={revalidateRecentMember} className={'ml-4'}>
            <Button size="icon" type={'submit'} variant={'ghost'}>
              <RotateCcw className={'w-5 h-5'} />
            </Button>
          </form>
        </ToolTip>
      </CardHeader>
      <CardContent>
        {error ? (
          <div className="text-red-500 text-sm">
            Failed to load recent members.
          </div>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Member</TableHead>
                  <TableHead className="text-right">Registered Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentMember?.map((member, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <TypographyP
                        text={`${member.username} (${member.roleName})`}
                        className={'font-semibold'}
                      />
                      <div className="hidden text-sm text-muted-foreground md:inline">
                        {member.email}
                      </div>
                    </TableCell>
                    <TableCell className="text-right text-gray-500">
                      {dayjs(member.createdAt).format('DD MMM, YYYY')}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="mt-4 text-sm text-gray-500">
              {t2('lastUpdated')}:{' '}
              <strong>{dayjs().format('DD MMM, YYYY HH:mm')}</strong>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
