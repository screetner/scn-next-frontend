'use client'

import { useGetUserLogs } from '@/hooks/logs/useGetUserLogs'
import { SkeletonCard } from '@/components/SkeletonCard'
import React from 'react'
import { getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table'
import { activityLogsColumn } from '@/app/[locale]/(auth)/user-setting/table/activityLogsColumn'
import TanStackDataTable from '@/components/TanStackDataTable'

export default function ActivityLogs(){

  const { data, isLoading } = useGetUserLogs()
  const table = useReactTable({
    columns: activityLogsColumn(),
    data: data?.data || [],
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })


  if (isLoading) return <SkeletonCard />


  return <>
    <TanStackDataTable table={table} />
  </>
}
