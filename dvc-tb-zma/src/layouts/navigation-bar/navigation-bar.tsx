import './navigation-bar.scss'

import React, { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { BottomNavigation, useNavigate } from 'zmp-ui'

import { navItems, showNavigationOn } from '@/constants'

const NavigationBar: React.FC = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('/')
  const location = useLocation()

  // Check if current path should hide navigation
  const shouldShowNavigation = useMemo(() => {
    return showNavigationOn.includes(location.pathname)
  }, [location.pathname])

  useEffect(() => {
    if (navItems.find((item) => item.key === location.pathname)) {
      setActiveTab(location.pathname)
    }
  }, [location])
  return shouldShowNavigation ? (
    <BottomNavigation
      fixed
      activeKey={activeTab}
      onChange={(key) => {
        navigate(key, { replace: true })
      }}
    >
      {navItems.map((item) => {
        const { key, ...itemProps } = item
        return <BottomNavigation.Item key={key} {...itemProps} />
      })}
    </BottomNavigation>
  ) : null
}

export default NavigationBar
