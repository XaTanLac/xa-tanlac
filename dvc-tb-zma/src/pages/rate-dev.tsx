import React from 'react'
import { Page, Box, Text, Button, Icon, useNavigate, Header } from 'zmp-ui'

const RateDevPage: React.FC = () => {
  const navigate = useNavigate()

  return (
    <Page hideScrollbar className='page bg-white -mt-10'>
      <Header title='Đánh giá sự hài lòng' backgroundColor='#ffffff' />
      <Box flex justifyContent='center' alignContent='center' className='!min-h-screen'>
        <Box p={5} className='bg-light-gray rounded-lg shadow-md w-full max-w-sm text-center border'>
          <Box p={4} className='text-center'>
            <Icon icon='zi-info-circle' size={50} className='mb-4 text-primary text-blue-600' /> {/* Thêm icon */}
            <Text size='large' bold className='mb-4'>
              Chức năng đang trong quá trình phát triển
            </Text>
            <Text size='small' className='mb-6'>
              Chúng tôi đang hoàn thiện tính năng này và sẽ ra mắt sớm. Cảm ơn bạn đã thông cảm.
            </Text>
            <Button size='large' variant='secondary' className='w-full' onClick={() => navigate(-1)}>
              Quay lại
            </Button>
          </Box>
        </Box>
      </Box>
    </Page>
  )
}

export default RateDevPage
