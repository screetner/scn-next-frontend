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
export default async function RecentMember() {
  const recentMember = await getRecentMembers(8)

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
            <Button size="icon" className="ml-auto gap-1" variant={'ghost'}>
              <RotateCcw className={'w-5 h-5'} />
            </Button>
          </ToolTip>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Member</TableHead>
                <TableHead className="text-right">Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentMember.map((member, index) => (
                <TableRow key={index}>
                  <TableCell className={''}>
                    <div className="font-medium">{member.userName}</div>
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
        </CardContent>
      </Card>
    </>
  )
}
