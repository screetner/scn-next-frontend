import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Link } from 'lucide-react'
import { getTotalInvitees } from '@/actions/member'
import { TypographyH2 } from '@/components/typography/TypographyH2'

export default async function TotalInviteURLPage() {
  const { data, error } = await getTotalInvitees()

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-lg font-semibold">
          Invite URL Stats
        </CardTitle>
        <Link className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {error ? (
          <div className="text-red-500 text-sm">Failed to load invite data</div>
        ) : (
          <div className="space-y-2">
            <TypographyH2 text={`${data?.inviteTotal} Total Invites`} />
            <div className="flex items-center text-xl">
              <span className="font-semibold text-green-600">
                {data?.inviteActivate} Activated
              </span>
              <span className="ml-2 text-gray-500 text-sm">
                {data!.inviteTotal > 0
                  ? `(${((data!.inviteActivate / data!.inviteTotal) * 100).toFixed(1)}%)`
                  : 'N/A'}
              </span>
            </div>

            <div className="text-sm text-gray-500 mt-2">
              {data!.inviteTotal > 0 && (
                <span>
                  Last updated:{' '}
                  <strong>{new Date().toLocaleDateString()}</strong>
                </span>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
