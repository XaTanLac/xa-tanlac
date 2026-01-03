import React from 'react'
import { Box, Header, Text } from 'zmp-ui'

import logo from '@/assets/images/logo.jpg'

const HomeHeader: React.FC = () => {
  return (
    <Header
      className='app-header no-border !py-6'
      title={
        (
          <Box flex alignItems='center' className='gap-2'>
            <img className='bg-white rounded-full' src={logo} alt='logo' width={28} />
            <Box>
              <Text size='small' className='!font-bold'>
                Xã Vĩnh Hòa
              </Text>
              <Text size='xxxSmall'>Nền tảng công dân số của xã Vĩnh Hòa</Text>
            </Box>
          </Box>
        ) as unknown as string
      }
      showBackIcon={false}
      backgroundColor='#ffffff'
    />
  )
}

export default HomeHeader
