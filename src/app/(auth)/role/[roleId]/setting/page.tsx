import Settings from '@/app/(auth)/role/[roleId]/setting/Setting'
import * as action from '@/actions'

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
    <div className="flex flex-col xl:flex-row gap-4 h-[full]">
      <Settings
        roleId={params.roleId}
        roleList={roleList}
        roleManageInfo={RoleInfo!}
        initialTab={searchParams?.tab || 'display'}
      />
    </div>
  )
}
