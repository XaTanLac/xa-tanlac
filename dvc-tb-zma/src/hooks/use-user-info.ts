import { useCallback, useEffect, useState } from 'react'
import { getAccessToken, getPhoneNumber, getUserInfo } from 'zmp-sdk'

import { SECRET_KEY, ZL_ENDPOINT_GET_USER } from '@/constants'

export interface IUserInfo {
  name: string
  avatar: string
  phoneNumber: string
}

interface UseUserInfoOptions {
  delay?: number
  autoFetch?: boolean
}

interface UseUserInfoReturn {
  userInfo: IUserInfo | undefined
  isLoading: boolean
  error: string | undefined
  refetch: () => Promise<void>
}

const useUserInfo = ({ delay = 0, autoFetch = true }: UseUserInfoOptions = {}): UseUserInfoReturn => {
  const [userInfo, setUserInfo] = useState<IUserInfo>()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string>()

  const fetchUserProfile = useCallback(async () => {
    setIsLoading(true)
    setError(undefined)

    try {
      const [accessToken, phoneToken, userInfoResult] = await Promise.all([
        getAccessToken(),
        getPhoneNumber(),
        getUserInfo({ autoRequestPermission: true }),
      ])

      const response = await fetch(
        `${ZL_ENDPOINT_GET_USER}?access_token=${accessToken}&secret_key=${SECRET_KEY}&code=${phoneToken.token}`,
        { method: 'GET' },
      )

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const { data } = await response.json()

      setUserInfo({
        name: userInfoResult.userInfo?.name || '',
        avatar: userInfoResult.userInfo?.avatar || '',
        phoneNumber: data?.number || '',
      })
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch user info'
      setError(errorMessage)
      console.error('Error fetching user info:', err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!autoFetch) return

    const timer = setTimeout(fetchUserProfile, delay)
    return () => clearTimeout(timer)
  }, [fetchUserProfile, delay, autoFetch])

  return {
    userInfo,
    isLoading,
    error,
    refetch: fetchUserProfile,
  }
}

export default useUserInfo
