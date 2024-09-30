import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import OrgTable from '@/app/[locale]/(auth)/(Owner)/owner/organization/table/OrgTable'

export default function Page() {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Organization Management</CardTitle>
          <CardDescription>Create Edit Organization</CardDescription>
        </CardHeader>
        <CardContent>
          <OrgTable />
        </CardContent>
      </Card>
    </>
  )
}
