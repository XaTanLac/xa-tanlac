import React, { ReactNode } from 'react'
import { Box, Text } from 'zmp-ui'

interface ImageIconProps {
  icon: string
  title: ReactNode
  onClick: React.MouseEventHandler<HTMLDivElement>
  className?: string
  isBackground?: boolean
}

const IconButton: React.FC<ImageIconProps> = ({ icon, isBackground = false, title, className, onClick }) => {
  return (
    <Box flex flexDirection='column' alignContent='center' className={`gap-2 w-1/4 ${className}`} onClick={onClick}>
      {isBackground ? (
        <Box
          flex
          justifyContent='center'
          alignItems='center'
          className='border-[2px] border-green-700 rounded-lg w-14 h-14 overflow-hidden'
        >
          <img className='object-contain w-2/3' src={icon} alt='icon' />
        </Box>
      ) : (
        <img className='w-2/3' src={icon} alt='icon' />
      )}
      <Text size={isBackground ? 'xxxSmall' : 'xSmall'} className='!font-medium'>
        <div className='text-wrap text-center'>{title}</div>
      </Text>
    </Box>
  )
}

export default IconButton
