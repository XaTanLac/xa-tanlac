import React, { useEffect, useMemo, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { getAppInfo } from 'zmp-sdk'
import { Box } from 'zmp-ui'

import logoEkila from '@/assets/images/logo_ekila.png'
import { showNavigationOn } from '@/constants'
import { cn } from '@/utils/string-handler'

const DefaultLayout: React.FC = () => {
  const [appVersion, setVersion] = useState<string>('')
  const [appName, setName] = useState<string>('')

  const location = useLocation()

  // Check if current path should hide navigation
  const isShowNavigation = useMemo(() => {
    return showNavigationOn.includes(location.pathname)
  }, [location.pathname])

  useEffect(() => {
    getAppInfo({
      success: (data) => {
        const { version, name } = data
        setVersion(version)
        setName(name)
      },
      fail: (error) => {
        console.log(error)
      },
    })
  }, [])

  return (
    <Box mt={8}>
      <Outlet />
      <Box
        flex
        justifyContent='center'
        alignItems='center'
        flexDirection='column'
        p={2}
        className={cn(isShowNavigation && '!pb-14', 'text-xs text-gray-500 bg-slate-50')}
      >
        <div className='font-medium'>Version {appVersion}</div>
        <div className='font-medium'>&copy; 2025 {appName}</div>
        <div className={cn('flex gap-2 items-center py-2', isShowNavigation && 'pb-2')}>
          Đơn vị xây dựng
          <img className='w-10 h-auto' src={logoEkila} alt='logo' />
          www.ekila.vn
        </div>
      </Box>
    </Box>
  )
}

export default DefaultLayout
