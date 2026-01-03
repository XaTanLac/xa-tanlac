import NavigationCard from '@/components/navigation-card'
import DefaultHeader from '@/layouts/default-header'
import React from 'react'
import { createShortcut } from 'zmp-sdk'
import { Box, Page, Text } from 'zmp-ui'

const SettingsPage: React.FC = () => {
  const handleCreateShortcut = async () => {
    await createShortcut()
  }
  return (
    <Page hideScrollbar className='page bg-white'>
      <DefaultHeader title='Cài đặt' showBackIcon={false} />
      <Box mt={7}>
        <Text className='!font-bold text-sky-600'>Hệ thống</Text>
      </Box>
      <NavigationCard
        titleSize='sm'
        title='Thêm ứng dụng ra màn hình chính'
        customClassName='!px-0 bg-white'
        onClick={handleCreateShortcut}
      />
    </Page>
  )
}

export default SettingsPage
