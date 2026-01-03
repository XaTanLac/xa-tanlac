import React from 'react'
import { Box } from 'zmp-ui'

const SkeletonCard: React.FC = () => {
  return (
    <Box flex px={2} mb={2} className='!bg-gray-50 rounded-lg shadow-sm space-x-2'>
      <div className='w-1/2 h-28 object-cover rounded-md rounded-r-none bg-gray-200 animate-pulse' />
      <Box p={1} py={2} flex flexDirection='column' className='gap-3 w-full'>
        <div className='font-semibold text-gray-800 line-clamp-2 flex-2 py-1 bg-gray-200 text-transparent rounded-lg animate-pulse'>
          title
        </div>
        <span className='text-gray-800 line-clamp-3 text-xs flex-1 bg-gray-200 text-transparent rounded-lg animate-pulse'>
          description
        </span>
      </Box>
    </Box>
  )
}

export default SkeletonCard
