import React from 'react'
import { Box, Text } from 'zmp-ui'
import noDataImage from '@/assets/images/empty-data.svg'

interface NoDataSectionProps {
  title?: string
  description?: string
}

const NoDataSection: React.FC<NoDataSectionProps> = ({
  title = 'Không có dữ liệu',
  description = 'Vui lòng thử lại sau hoặc kiểm tra kết nối của bạn.',
}) => {
  return (
    <Box flex justifyContent='center' alignItems='center' className='!h-screen !w-full'>
      <Box flex flexDirection='column' alignItems='center' className='text-center'>
        <img className='w-2/3' src={noDataImage} alt='no data' />

        <Text className='mt-5 capitalize !font-semibold text-gray-700' size='normal'>
          {title}
        </Text>
        <Text className='w-2/3 mt-2 text-gray-600' size='small'>
          {description}
        </Text>
      </Box>
    </Box>
  )
}

export default NoDataSection
