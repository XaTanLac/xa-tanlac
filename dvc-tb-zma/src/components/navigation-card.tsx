import React from 'react'
import { cn } from '@/utils/string-handler'
import { Box, Icon, Text } from 'zmp-ui'

export interface INavigationCardProps {
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  title?: string
  titleSize?: 'xs' | 'sm' | 'base' | 'lg' | 'xl'
  description?: string
  descriptionSize?: 'xs' | 'sm' | 'base' | 'lg' | 'xl'
  isNavIcon?: boolean
  customClassName?: string
  children?: React.ReactNode
  onClick?: () => void
}

const NavigationCard: React.FC<INavigationCardProps> = ({
  prefix,
  suffix,
  children,
  title,
  description,
  titleSize = 'base',
  descriptionSize = 'base',
  isNavIcon: isIcon = true,
  customClassName = '',
  onClick,
}) => {
  const titleTextSize = `!text-${titleSize}`
  const descriptionTextSize = `!text-${descriptionSize}`
  return (
    <Box
      className={cn(
        customClassName,
        'w-full bg-slate-50 !flex !p-4 gap-4 items-center justify-between',
        onClick && 'active:opacity-70',
      )}
      onClick={onClick}
    >
      {prefix}
      {children && <Box className='flex-1'>{children}</Box>}
      {(title || description) && (
        <Box className='flex-1 max-w-[78.5%]'>
          {title && <Text className={cn(titleTextSize)}>{title}</Text>}
          {description && <Text className={cn(descriptionTextSize, 'mt-[2px] text-gray-700')}>{description}</Text>}
        </Box>
      )}
      {isIcon && (
        <Box>
          <Icon icon='zi-chevron-right' className='text-gray-500' />
        </Box>
      )}
      {suffix}
    </Box>
  )
}

export default NavigationCard
