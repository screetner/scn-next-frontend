import { getTotalAdmins } from '@/actions/member'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ShieldCheck } from 'lucide-react'

export default async function TotalAdminPage() {
  const { data, error } = await getTotalAdmins()
  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-bold">Admins</CardTitle>
          <ShieldCheck className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {error ? 'Failed to fetch total admins' : data}
          </div>
        </CardContent>
      </Card>
    </>
  )
}
