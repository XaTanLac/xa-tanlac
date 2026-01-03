import Markdown from 'markdown-to-jsx'
import React from 'react'
import { Box, Text } from 'zmp-ui'

import { formatDateDDMMYYYYhhmm } from '@/utils/string-handler'

interface ArticleCardProps {
  title: string
  content: string
  createdAt: string
  imgBanner?: string
  onClick?: () => void
}

const ArticleCard: React.FC<ArticleCardProps> = ({ title, content, imgBanner, createdAt, onClick }) => {
  return (
    <Box flex pr={2} className='bg-white border border-gray-300 rounded-lg shadow-sm space-x-2' onClick={onClick}>
      {imgBanner && (
        <Box className='!w-1/3 overflow-hidden rounded-l-lg' style={{ flexShrink: 0 }}>
          <img src={imgBanner} alt={title} className='w-full h-full object-cover rounded-md rounded-r-none' />
        </Box>
      )}
      <Box p={2} flex flexDirection='column' className='gap-2'>
        <Box flex flexDirection='column' className='gap-1 flex-1'>
          <h3 className='font-semibold text-gray-800 line-clamp-2'>{title}</h3>
          <Text className='!text-gray-800 !line-clamp-3 !text-xs'>{content}</Text>
        </Box>
        <Text size='xxxSmall' className='text-gray-500'>
          {formatDateDDMMYYYYhhmm(createdAt)}
        </Text>
      </Box>
    </Box>
  )
}

export default ArticleCard
