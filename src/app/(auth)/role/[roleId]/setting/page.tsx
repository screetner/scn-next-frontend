import Settings from '@/app/(auth)/role/[roleId]/setting/Setting'
import { RoleSettingProvider } from '@/context/RoleSettingContext'
import { getRoleManagement, getRolesTable } from '@/actions/role'

interface ManageRoleProps {
  params: { roleId: string }
  searchParams?: { tab: string | undefined }
}

export default async function ManageRole({
  params,
  searchParams,
}: ManageRoleProps) {
  const [roleList, RoleInfo] = await Promise.all([
    getRolesTable(),
    getRoleManagement(params.roleId),
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
