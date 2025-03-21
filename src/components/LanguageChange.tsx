'use client'

import * as React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { usePathname, useRouter } from '@/i18n/routing'
import { useLocale } from 'next-intl'
import { ThailandFlag, UnitedKingdomFlag } from '@/components/svg/flags'

type Locale = 'en' | 'th'

export function LanguageChange({
  side = 'right',
}: {
  side?: 'left' | 'right' | 'top' | 'bottom'
}) {
  const languages: Locale[] = ['en', 'th']
  const router = useRouter()
  const path = usePathname()
  const locale = useLocale()

  const changeLanguage = React.useCallback(
    (newLocale: Locale) => {
      if (router && path) {
        router.push(path, { locale: newLocale })
      }
    },
    [router, path],
  )

  if (!router || !path) {
    return null
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" aria-label={locale}>
          {locale === 'en' ? <UnitedKingdomFlag /> : <ThailandFlag />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side={side}>
        {languages.map(loc => (
          <DropdownMenuItem
            key={loc}
            onSelect={() => changeLanguage(loc)}
            disabled={locale === loc}
          >
            <span className="flex justify-between w-full">
              {loc.toUpperCase()}
              {loc === 'en' ? <UnitedKingdomFlag /> : <ThailandFlag />}
            </span>{' '}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
