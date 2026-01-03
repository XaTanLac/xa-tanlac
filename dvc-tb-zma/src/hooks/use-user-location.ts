import { useCallback, useEffect, useState } from 'react'
import { getAccessToken, getLocation } from 'zmp-sdk'

import { SECRET_KEY, ZL_ENDPOINT_GET_USER } from '@/constants'

export interface IUserLocation extends google.maps.LatLngLiteral {}

interface UseUserLocationOptions {
  delay?: number
  autoFetch?: boolean
}

interface UseUserLocationReturn {
  userLocation: IUserLocation | undefined
  isLoading: boolean
  error: string | undefined
  refetch: () => Promise<void>
}

const useUserLocation = ({ delay = 0, autoFetch = true }: UseUserLocationOptions = {}): UseUserLocationReturn => {
  const [userLocation, setUserLocation] = useState<IUserLocation>()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string>()

  const fetchUserLocation = useCallback(async () => {
    setIsLoading(true)
    setError(undefined)

    try {
      const [accessToken, positionToken] = await Promise.all([getAccessToken(), getLocation()])

      const response = await fetch(
        `${ZL_ENDPOINT_GET_USER}?access_token=${accessToken}&secret_key=${SECRET_KEY}&code=${positionToken.token}`,
        { method: 'GET' },
      )

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const { data } = await response.json()
      setUserLocation({
        lat: parseFloat(data?.latitude) || 0,
        lng: parseFloat(data?.longitude) || 0,
      })
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch user location'
      setError(errorMessage)
      console.error('Error fetching user location:', err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!autoFetch) return

    const timer = setTimeout(fetchUserLocation, delay)
    return () => clearTimeout(timer)
  }, [autoFetch, delay, fetchUserLocation])

  return {
    userLocation,
    isLoading,
    error,
    refetch: fetchUserLocation,
  }
}

export default useUserLocation
