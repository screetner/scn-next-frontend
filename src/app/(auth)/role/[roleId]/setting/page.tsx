import Settings from '@/app/(auth)/role/[roleId]/setting/Setting'
import * as action from '@/actions'
import { RoleSettingProvider } from '@/context/RoleSettingContext'

interface ManageRoleProps {
  params: { roleId: string }
  searchParams?: { tab: string | undefined }
}

export default async function ManageRole({
  params,
  searchParams,
}: ManageRoleProps) {
  const [roleList, RoleInfo] = await Promise.all([
    action.getRolesTable(),
    action.getRoleManagement(params.roleId),
  ])
  return (
    <RoleSettingProvider
      data={{
        roleId: params.roleId,
        roleList,
        roleManageInfo: RoleInfo!,
      }}
    >
      <div className="flex flex-col xl:flex-row gap-4 h-[full]">
        <Settings initialTab={searchParams?.tab || 'display'} />
      </div>
    </RoleSettingProvider>
  )
}
