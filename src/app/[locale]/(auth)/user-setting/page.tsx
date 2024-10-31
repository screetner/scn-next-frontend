import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import UserSettingTabs from '@/app/[locale]/(auth)/user-setting/Tabs'
import React from 'react'

export default function UserSettingPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>User Setting</CardTitle>
        <CardDescription>Manage your account settings</CardDescription>
      </CardHeader>
      <CardContent>
        <UserSettingTabs />
      </CardContent>
    </Card>
  )
}
