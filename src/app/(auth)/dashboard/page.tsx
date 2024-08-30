import { DashboardMap } from '@/app/(auth)/dashboard/DashboardMap';
import * as actions from '@/actions';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TypographyP } from '@/components/typography/TypographyP';
import { TypographyH2 } from '@/components/typography/TypographyH2';

export default async function Dashboard() {
  const assets = await actions.getAssets();
  return (
    <>
      <Card className={'h-full'}>
        <CardHeader>
          <CardTitle>Asset Dashboard</CardTitle>
          <CardDescription>
            Manage your assets and view their locations on the map.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DashboardMap data={assets} />
        </CardContent>
      </Card>
    </>
  );
}
