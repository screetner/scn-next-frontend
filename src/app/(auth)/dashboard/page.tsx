import { DashboardMap } from '@/app/(auth)/dashboard/DashboardMap'
import * as actions from '@/actions'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default async function Dashboard() {
  const assets = await actions.getAssets()
  return (
    <>
      <Card className={'h-full'}>
        <CardHeader>
          <CardTitle>Asset Dashboard</CardTitle>
          <CardDescription>
            Manage your assets and view their locations on the map.
          </CardDescription>
        </CardHeader>
        <CardContent className={'h-[90%]'}>
          <Card className="h-full">
            <DashboardMap data={assets} />
          </Card>
        </CardContent>
      </Card>
    </>
  )
}
