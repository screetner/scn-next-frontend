import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import InviteButton from '@/app/[locale]/(auth)/(Org)/member/@inviteLink/InviteButton'
import { getTranslations } from 'next-intl/server'
import { inviteList } from '@/actions/member'
import dayjs from 'dayjs'

export default async function CreateInviteLink() {
  const t = await getTranslations('MemberPage.inviteLink')
  const { data } = await inviteList()
  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center">
          <div className="grid gap-2">
            <CardTitle>{t('title')}</CardTitle>
            <CardDescription>{t('description')}</CardDescription>
          </div>
          <InviteButton />
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <div className="text-sm text-muted-foreground">Inviter</div>
                </TableHead>
                <TableHead>
                  <div className="text-sm text-muted-foreground">Invitee</div>
                </TableHead>
                <TableHead className="text-right">
                  <div className="text-sm text-muted-foreground">Time</div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {
                data.map(item => (
                  <TableRow key={item.time}>
                    <TableCell>
                      <div className="font-medium">{item.inviterEmail}</div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{item.inviteeEmail}</div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="font-medium">
                        {dayjs(item.time).format('DD MMM, YYYY')}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  )
}
