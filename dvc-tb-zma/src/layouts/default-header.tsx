import React from 'react'
import { Box, Header, Icon, Text } from 'zmp-ui'

interface DefaultHeaderProps {
  title: string
  showBackIcon?: boolean
  onBackClick?: () => void
}

const DefaultHeader: React.FC<DefaultHeaderProps> = ({ title, showBackIcon, onBackClick }) => {
  return (
    <Header
      className='app-header no-border !py-6'
      title={
        (
          <Box flex alignItems='center' className='gap-2'>
            <Text size='normal' className='w-3/4 !font-medium truncate'>
              {title}
            </Text>
          </Box>
        ) as unknown as string
      }
      showBackIcon={showBackIcon}
      backIcon={<Icon icon='zi-arrow-left' />}
      onBackClick={onBackClick}
    />
  )
}

export default DefaultHeader
