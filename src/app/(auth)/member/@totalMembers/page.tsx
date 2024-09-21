import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, TrendingUp, TrendingDown } from 'lucide-react'
import { TypographyH2 } from '@/components/typography/TypographyH2'
import dayjs from 'dayjs'

export default async function TotalMembersPage() {
  const { data, error } = {
    data: {
      totalMembers: 1523,
      growthRate: 0,
      lastUpdated: dayjs().format('DD MMM YYYY'),
    },
    error: null,
  }

  const growthPositive = data.growthRate >= 0

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-lg font-semibold">Total Members</CardTitle>
        <Users className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {error ? (
          <div className="text-red-500 text-sm">Failed to load member data</div>
        ) : (
          <div className="space-y-2">
            <TypographyH2 text={`+${data.totalMembers}`} />
            <div className="text-sm text-gray-500">
              Members in the organization
            </div>

            <div className="flex items-center text-sm mt-2 text-gray-500">
              <span
                className={`flex items-center ${growthPositive ? 'text-green-600' : 'text-red-600'}`}
              >
                {growthPositive ? (
                  <TrendingUp className="w-4 h-4 mr-1" />
                ) : (
                  <TrendingDown className="w-4 h-4 mr-1" />
                )}
                {Math.abs(data.growthRate)}%{' '}
                {growthPositive ? 'increase' : 'decrease'} since last month
              </span>
            </div>

            <div className="text-xs text-gray-400 mt-2">
              Last updated: {data.lastUpdated}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
