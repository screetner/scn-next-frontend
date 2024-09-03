import { redirect } from 'next/navigation'
import { fillRoute, Routes } from '@/routes'

interface NotFoundProps {
  params: { roleId: string }
}

export default function Page({ params }: NotFoundProps) {
  redirect(fillRoute(Routes.ROLE_SETTING, params.roleId))
}
