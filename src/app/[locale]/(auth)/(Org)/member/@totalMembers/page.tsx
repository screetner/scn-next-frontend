import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, TrendingUp, TrendingDown } from 'lucide-react'
import { TypographyH2 } from '@/components/typography/TypographyH2'
import dayjs from 'dayjs'
import { getTotalMembers } from '@/actions/member'
import { getTranslations } from 'next-intl/server'

export default async function TotalMembersPage() {
  const { data, error } = await getTotalMembers()
  const t = await getTranslations('MemberPage.totalMember')
  const t2 = await getTranslations('MemberPage')

  const growthPositive = data!.percentageIncrease > 0

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-lg font-semibold">
          {t('totalMembersTitle')}
        </CardTitle>
        <Users className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {error ? (
          <div className="text-red-500 text-sm">Failed to load member data</div>
        ) : (
          <div className="space-y-2">
            <TypographyH2 text={`+${data!.allMembers}`} />
            <div className="text-sm text-gray-500">{t('description')}</div>

            <div className="flex items-center text-sm mt-2 text-gray-500">
              <span
                className={`flex items-center ${growthPositive ? 'text-green-600' : 'text-red-600'}`}
              >
                {growthPositive ? (
                  <TrendingUp className="w-4 h-4 mr-1" />
                ) : (
                  <TrendingDown className="w-4 h-4 mr-1" />
                )}
                {t('growth', {
                  percentage: Math.abs(data!.percentageIncrease),
                  growth: growthPositive ? 'increase' : 'decrease',
                })}
              </span>
            </div>

            <div className="text-xs text-gray-400 mt-2">
              {t2('lastUpdated')}: {dayjs().format('DD MMM YYYY')}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
