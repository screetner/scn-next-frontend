import React from 'react'

interface LayoutProps {
  children: React.ReactNode
  totalMembers: React.ReactNode
  totalInviteURL: React.ReactNode
  totalAdmin: React.ReactNode
  inviteLink: React.ReactNode
  recentMember: React.ReactNode
}

export default function Layout({
  children,
  totalMembers,
  totalInviteURL,
  totalAdmin,
  inviteLink,
  recentMember,
}: LayoutProps) {
  return (
    <div>
      <div className={'grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3 mb-5'}>
        {totalMembers}
        {totalInviteURL}
        {totalAdmin}
      </div>
      <div className={'grid gap-4 md:grid-cols-2'}>
        {inviteLink}
        {recentMember}
      </div>
      {children}
    </div>
  )
}
