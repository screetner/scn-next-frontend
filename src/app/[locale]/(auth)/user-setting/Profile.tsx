'use client'

import React from 'react'
import { useSession } from 'next-auth/react'
import { User, Briefcase, Building2, AtSign } from 'lucide-react'
import { SkeletonCard } from '@/components/SkeletonCard'
import { TypographyH3 } from '@/components/typography/TypographyH3'
import { Separator } from '@/components/ui/separator'

export default function Profile() {
  const { data: session } = useSession()
  if (!session) return <SkeletonCard />
  return (
    <div className="flex flex-col space-y-4">
      <TypographyH3 text={'Profile'} />
      <Separator />
      <div className="w-full space-y-4">
        <ProfileItem
          icon={<AtSign size={18} />}
          label="Email"
          value={session?.user?.email}
        />
        <ProfileItem
          icon={<User size={18} />}
          label="Role"
          value={session?.user?.roleName}
        />
        <ProfileItem
          icon={<Building2 size={18} />}
          label="Organization"
          value={session?.user?.orgName}
        />
        <ProfileItem
          icon={<Briefcase size={18} />}
          label="Username"
          value={session?.user?.username}
        />
      </div>
    </div>
  )
}

function ProfileItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string
}) {
  return (
    <div className="flex items-center space-x-3">
      <div className="flex items-center justify-center w-10 h-10 rounded-full">
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <p className="text-sm font-semibold">{value || 'Not provided'}</p>
      </div>
    </div>
  )
}
