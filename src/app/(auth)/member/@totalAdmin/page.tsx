import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ShieldCheck } from 'lucide-react'

export default function TotalAdminPage() {
  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Admin</CardTitle>
          <ShieldCheck className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+12</div>
        </CardContent>
      </Card>
    </>
  )
}
