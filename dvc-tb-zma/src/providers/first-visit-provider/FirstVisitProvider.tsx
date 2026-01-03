import React, { createContext, useEffect, useState } from 'react'
import { getSystemInfo } from 'zmp-sdk'

import { AuthorizedHeader, DOMAIN } from '@/constants'

export interface FirstVisitContextProps {
  isFirstVisit: boolean
}

const FirstVisitContext = createContext<FirstVisitContextProps | undefined>(undefined)

export const FirstVisitProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isFirstVisit, setIsFirstVisit] = useState(true)
  const { platform } = getSystemInfo()

  useEffect(() => {
    if (isFirstVisit && platform) {
      ;(async () => {
        try {
          await fetch(`${DOMAIN}/api/number-of-visits`, {
            method: 'POST',
            headers: AuthorizedHeader,
            body: JSON.stringify({
              data: {
                device: platform,
                timeVisit: new Date().toISOString(),
              },
            }),
          })
        } catch (error) {
          console.error('Error calling track API:', error)
        } finally {
          setIsFirstVisit(false)
        }
      })()
    }
  }, [isFirstVisit, platform])

  return <FirstVisitContext.Provider value={{ isFirstVisit }}>{children}</FirstVisitContext.Provider>
}
