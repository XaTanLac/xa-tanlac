import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { Box, Icon, Page, Text } from 'zmp-ui'

import userDefaultIcon from '@/assets/images/user-default.png'
import NavigationCard from '@/components/navigation-card'
import useUserInfo from '@/hooks/use-user-info'
import DefaultHeader from '@/layouts/default-header'
import { userState } from '@/state'
import { formatPhoneNumber } from '@/utils/string-handler'

const ProfilePage: React.FC = () => {
  const [userInfo, setUserInfo] = useRecoilState(userState)
  const { userInfo: user, isLoading, refetch: refetchGetUserInfo } = useUserInfo({ autoFetch: false })

  useEffect(() => {
    if (user && !isLoading) {
      setUserInfo(user)
    }
  }, [user, isLoading, setUserInfo])

  useEffect(() => {
    if (!userInfo) {
      refetchGetUserInfo()
    }
  }, [userInfo, refetchGetUserInfo])

  return (
    <Page hideScrollbar className='page bg-white'>
      <DefaultHeader title='Thông tin tài khoản' showBackIcon={false} />
      <Box className='justify-items-center' textAlign='center' mt={10} mb={5}>
        <img className='w-20 h-20 mb-2 rounded-full' src={userInfo?.avatar || userDefaultIcon} alt='avatar' />
        <Text size='small'>{userInfo?.name || ''}</Text>
      </Box>
      <Box>
        <NavigationCard
          customClassName='!px-0 !justify-start bg-white border-b border-gray-100'
          title='Họ và tên'
          isNavIcon={false}
          prefix={<Icon icon='zi-user-circle' />}
          suffix={<Text>{userInfo?.name || ''}</Text>}
        />
        <NavigationCard
          customClassName='!px-0 !justify-start bg-white border-b border-gray-100'
          title='Số điện thoại'
          isNavIcon={false}
          prefix={<Icon icon='zi-call' />}
          suffix={<Text>{formatPhoneNumber(userInfo?.phoneNumber || '')}</Text>}
        />
      </Box>
    </Page>
  )
}

export default ProfilePage
