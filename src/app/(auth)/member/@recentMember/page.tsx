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

export default async function RecentMember() {
  const { data: recentMember, error } = await getRecentMembers(8)

  const revalidateRecentMember = async () => {
    'use server'
    revalidateTag('@recentMember')
  }

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center">
          <div className="grid gap-2">
            <CardTitle>Recent members</CardTitle>
            <CardDescription>
              Latest members who joined the organization
            </CardDescription>
          </div>
          <ToolTip content={'Refresh'} side={'top'}>
            <form action={revalidateRecentMember} className={'ml-auto gap-1'}>
              <Button size="icon" type={'submit'} variant={'ghost'}>
                <RotateCcw className={'w-5 h-5'} />
              </Button>
            </form>
          </ToolTip>
        </CardHeader>
        <CardContent>
          {error ? (
            <div className="text-red-500">{error}</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Member</TableHead>
                  <TableHead className="text-right">Registered Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentMember.map((member, index) => (
                  <TableRow key={index}>
                    <TableCell className={''}>
                      <div className="font-medium">
                        {member.userName} ({member.roleName})
                      </div>
                      <div className="hidden text-sm text-muted-foreground md:inline">
                        {member.email}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      {dayjs(member.createdAt).format('DD MMM, YYYY')}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </>
  )
}
