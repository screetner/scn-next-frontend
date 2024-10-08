import { ColumnDef } from '@tanstack/table-core'
import { OrganizationAll } from '@/types/owner/organization'

export const OrgTableColumn = (): ColumnDef<OrganizationAll>[] => [
  {
    accessorKey: 'orgName',
    header: 'Organization Name',
  },
  {
    accessorKey: 'orgMember',
    header: '# Members',
  },
  {
    accessorKey: 'orgAssets',
    header: '# Assets',
  },
]
