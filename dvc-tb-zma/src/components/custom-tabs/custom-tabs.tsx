import './custom-tabs.scss'

import React from 'react'
import { Tabs } from 'zmp-ui'

export interface ITab {
  id: number | string
  label: string
}

interface CustomTabsProps {
  items: ITab[]
  pageContent: React.ReactNode
  scrollable?: boolean
  onTabClick?: (tabId: number | string) => void
}

const CustomTabs: React.FC<CustomTabsProps> = ({ items, pageContent, scrollable, onTabClick }) => {
  return (
    <Tabs className='custom-tabs' scrollable={scrollable} onTabClick={onTabClick}>
      {items.map((tab) => (
        <Tabs.Tab className='pt-2' key={tab.id} label={tab.label}>
          {pageContent}
        </Tabs.Tab>
      ))}
    </Tabs>
  )
}

export default CustomTabs
