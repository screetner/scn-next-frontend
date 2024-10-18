'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import React, { useState } from 'react'
import { Logs, Settings, UserPen } from 'lucide-react'
import Profile from '@/app/[locale]/(auth)/user-setting/Profile'
import Account from '@/app/[locale]/(auth)/user-setting/Account'

export default function UserSettingTabs() {
  const [activeTab, setActiveTab] = useState('profile')
  return (
    <>
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
        orientation={'vertical'}
      >
        <TabsList className="mb-4">
          <TabsTrigger value="profile" className={'space-x-2'}>
            <UserPen className={'w-5 h-5'} /> <span>Profile</span>
          </TabsTrigger>
          <TabsTrigger value="Account" className={'space-x-2'}>
            <Settings className={'w-5 h-5'} /> <span>Account</span>
          </TabsTrigger>
          <TabsTrigger value="Activity" className={'space-x-2'}>
            <Logs className={'w-5 h-5'} /> <span>Activity Logs</span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <Profile />
        </TabsContent>
        <TabsContent value="Account">
          <Account />
        </TabsContent>
        <TabsContent value="Activity">
          <div>Activity Logs</div>
        </TabsContent>
      </Tabs>
    </>
  )
}
