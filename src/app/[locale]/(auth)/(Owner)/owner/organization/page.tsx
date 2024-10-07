import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import OrgTable from '@/app/[locale]/(auth)/(Owner)/owner/organization/table/OrgTable'
import { getAllOrganization } from '@/actions/owner/organization'
import ErrorComponent from '@/components/Error'

export default async function Page() {
  const { data, error } = await getAllOrganization()

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Organization Management</CardTitle>
          <CardDescription>Create Edit Organization</CardDescription>
        </CardHeader>
        <CardContent>
          {error ? <ErrorComponent /> : <OrgTable data={data!} />}
        </CardContent>
      </Card>
    </>
  )
}
