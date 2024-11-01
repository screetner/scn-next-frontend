import { ColumnDef } from '@tanstack/table-core'
import { ActivityLogs } from '@/types/activity-logs'
import { Badge } from '@/components/ui/badge'
import dayjs from 'dayjs'

export const activityLogsColumn = () : ColumnDef<ActivityLogs>[] => {
  return [
    {
      accessorKey: 'description',
      header: 'Description',
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.original.status;
        return (
          <Badge variant={status === 'success' ? 'success' : 'destructive'}>
            {status}
          </Badge>
        );
      },
    },
    {
      accessorKey: 'timestamp',
      header: 'Timestamp',
      cell: ({row}) => dayjs(row.original.timestamp).format('DD MMM YYYY, hh:mm A')
    }
  ]
}