import { fillRoute, Routes } from '@/routes'
import { redirect } from '@/i18n/routing'

interface NotFoundProps {
  params: { roleId: string }
}

export default function Page({ params }: NotFoundProps) {
  redirect(fillRoute(Routes.ROLE_SETTING, params.roleId))
}
