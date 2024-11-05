import { Terminal } from 'lucide-react'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Link } from '@/i18n/routing'
import { useTranslations } from 'next-intl'

export function AddMemberAlert({ className = '' }: { className?: string }) {
  const t = useTranslations('RolePage.Alert')
  return (
    <Alert variant={'information'} className={`${className}`}>
      <Terminal className="h-5 w-5" />
      <AlertTitle>{t('title')}</AlertTitle>
      <AlertDescription>
        {t.rich('description', {
          Link: children => (
            <Link href={'/member'} className={'font-bold underline'}>
              {children}
            </Link>
          ),
        })}
      </AlertDescription>
    </Alert>
  )
}
