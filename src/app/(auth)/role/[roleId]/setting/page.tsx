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
  const [roleList, RoleInfo, listOfUnRoleMembers] = await Promise.all([
    action.getRolesTable(),
    action.getRoleManagement(params.roleId),
    action.getListOfUnRoleMembers(),
  ])
  return (
    <RoleSettingProvider
      data={{
        roleId: params.roleId,
        roleList,
        roleManageInfo: RoleInfo!,
        listOfUnRoleMembers: listOfUnRoleMembers!,
      }}
    >
      <div className="flex flex-col xl:flex-row gap-4 h-[full]">
        <Settings initialTab={searchParams?.tab || 'display'} />
      </div>
    </RoleSettingProvider>
  )
}
