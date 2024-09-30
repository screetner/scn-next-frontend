import { ColumnDef } from '@tanstack/table-core'

export interface OrgTableColumnI {
  orgId: string
  orgName: string
  orgMembers: number
  orgAssets: number
}

export const OrgTableColumn = (): ColumnDef<OrgTableColumnI>[] => [
  {
    accessorKey: 'orgName',
    header: 'Organization Name',
  },
  {
    accessorKey: 'orgMembers',
    header: '# Members',
  },
  {
    accessorKey: 'orgAssets',
    header: '# Assets',
  },
]
