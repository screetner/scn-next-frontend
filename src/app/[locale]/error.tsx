'use client'

import { Button } from '@/components/ui/button'
import { TypographyP } from '@/components/typography/TypographyP'
import Image from 'next/image'
import { Link } from '@/i18n/routing'

export default function Error() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-100 to-white text-gray-900">
      <Image src={'/error.svg'} alt={'404 error'} width={300} height={300} />
      <TypographyP
        text={'Sorry, something went wrong.'}
        className={'text-xl mb-8'}
      />
      <Button asChild size="lg">
        <Link href="/public">Home</Link>
      </Button>
    </div>
  )
}
