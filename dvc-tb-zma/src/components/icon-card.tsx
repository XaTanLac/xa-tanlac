import React from 'react'
import { Box, Text } from 'zmp-ui'

interface IconCardProps {
  title: string
  icon: string
  onClick?: () => void
}

const IconCard: React.FC<IconCardProps> = ({ icon, title, onClick }) => {
  return (
    <Box
      p={10}
      flex
      flexDirection='column'
      alignItems='center'
      className='gap-5 bg-white rounded-lg active:opacity-80'
      onClick={onClick}
    >
      <Box className='h-32 w-32'>
        <img src={icon} alt='icon' />
      </Box>
      <Text size='xSmall' className='!font-medium text-sky-600'>
        {title}
      </Text>
    </Box>
  )
}

export default IconCard
