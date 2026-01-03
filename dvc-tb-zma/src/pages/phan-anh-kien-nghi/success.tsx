import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Box, Button, Icon, Page, Text } from 'zmp-ui'

import DefaultHeader from '@/layouts/default-header'

const SuccessMessage: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const profile = location.state.data

  return (
    <Page hideScrollbar className='page bg-white'>
      <DefaultHeader title='Hồ sơ đã được gửi thành công' showBackIcon={false} />
      <Box py={4} flex flexDirection='column'>
        <p className='mb-5 text-sm text-gray-600'>Dưới đây là thông tin chi tiết:</p>
        <Box flex flexDirection='column' className='gap-2'>
          {profile.code && (
            <Box flex justifyContent='space-between' alignItems='center'>
              <Text size='large'>Mã hồ sơ:</Text>
              <Text size='large' bold>
                {profile.code}
              </Text>
            </Box>
          )}
          <Box flex justifyContent='space-between' alignItems='center'>
            <Text size='large'>Thời gian nộp:</Text>
            <Text size='large' bold>
              {new Date(profile.createdAt).toLocaleDateString('en-GB', {
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Text>
          </Box>
          {profile.processing_status && (
            <Box flex justifyContent='space-between' alignItems='center'>
              <Text size='large'>Trạng thái:</Text>
              <Text size='large' bold>
                <span className='text-yellow-600'>{profile.processing_status}</span>
              </Text>
            </Box>
          )}
        </Box>
        <Box mt={10}>
          <Button
            variant='primary'
            fullWidth
            suffixIcon={<Icon className='text-white' icon='zi-check' />}
            onClick={() => navigate(-1)}
          >
            Xác nhận
          </Button>
        </Box>
      </Box>
    </Page>
  )
}

export default SuccessMessage
