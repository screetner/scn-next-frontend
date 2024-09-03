import { mockRoles } from '@/types/role'
import Settings from '@/app/(auth)/role/[roleId]/setting/Setting'

interface ManageRoleProps {
  params: { roleId: string }
  searchParams?: { tab: string | undefined }
}

export default function ManageRole({ params, searchParams }: ManageRoleProps) {
  return (
    <div className="flex flex-col xl:flex-row gap-4 h-[full]">
      <Settings
        roleId={params.roleId}
        data={mockRoles}
        initialTab={searchParams?.tab || 'display'}
      />
    </div>
  )
}
