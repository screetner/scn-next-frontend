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
import InviteButton from '@/app/[locale]/(auth)/member/@inviteLink/InviteButton'

export default function CreateInviteLink() {
  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center">
          <div className="grid gap-2">
            <CardTitle>Create register URL</CardTitle>
            <CardDescription>
              Create a new register URL for inviting new members
            </CardDescription>
          </div>
          <InviteButton />
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  <div className="font-medium">Liam Johnson</div>
                  <div className="hidden text-sm text-muted-foreground md:inline">
                    liam@example.com
                  </div>
                </TableCell>
                <TableCell className="text-right">$250.00</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  )
}
