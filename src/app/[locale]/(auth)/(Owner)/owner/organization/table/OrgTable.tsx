'use client'

import TanStackDataTable from '@/components/TanStackDataTable'
import { getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { OrgTableColumn } from '@/app/[locale]/(auth)/(Owner)/owner/organization/table/OrgTableColumn'

export default function OrgTable() {
  const table = useReactTable({
    columns: OrgTableColumn(),
    data: [],
    getCoreRowModel: getCoreRowModel(),
  })
  return <TanStackDataTable table={table} />
}
