import Settings from '@/app/(auth)/role/[roleId]/setting/Setting'
import { mockRoleManagementResponse } from '@/types/role'

interface ManageRoleProps {
  params: { roleId: string }
  searchParams?: { tab: string | undefined }
}

export default function ManageRole({ params, searchParams }: ManageRoleProps) {
  return (
    <div className="flex flex-col xl:flex-row gap-4 h-[full]">
      <Settings
        roleId={params.roleId}
        data={mockRoleManagementResponse}
        initialTab={searchParams?.tab || 'display'}
      />
    </div>
  )
}
