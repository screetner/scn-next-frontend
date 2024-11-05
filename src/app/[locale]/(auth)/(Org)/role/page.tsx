import RoleTable from '../../../../../components/table/RoleTable'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { AddMemberAlert } from '@/app/[locale]/(auth)/(Org)/role/AddMemberAlert'
import { getRolesTable } from '@/actions/role'
import { getTranslations } from 'next-intl/server'

export default async function RoleManagement() {
  const roles = await getRolesTable()
  const t = await getTranslations('RolePage')

  return (
    <>
      <AddMemberAlert className={'mb-3'} />
      <Card>
        <CardHeader>
          <CardTitle>{t('title')}</CardTitle>
          <CardDescription>{t('description')}</CardDescription>
        </CardHeader>
        <CardContent>
          <RoleTable roles={roles} />
        </CardContent>
      </Card>
    </>
  )
}
