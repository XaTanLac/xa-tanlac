import { STORAGE_KEYS, TOKEN_EXPIRED_ERROR, ZALO_TOKEN_URL, ZALO_APP_ID, ZALO_APP_SECRET } from '@/constants/zalo-oa'

/**
 * Build headers with Zalo access token
 */
export const getAuthHeaders = (accessToken?: string): HeadersInit => {
  const headers: HeadersInit = { 'Content-Type': 'application/json' }
  const token = accessToken || localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN)
  if (token) {
    headers['access_token'] = token
  }
  return headers
}

/**
 * Get valid access token with smart initialization
 * - First time: use VITE_ZALO_ACCESS_TOKEN from env and save to localStorage
 * - After that: use localStorage token (auto-refreshed when expired)
 */
export const getValidAccessToken = (): string | null => {
  // Check localStorage first (has priority after first initialization)
  const localToken = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN)
  if (localToken) {
    return localToken
  }

  // Fall back to env variable (first time initialization)
  const envToken = import.meta.env.VITE_ZALO_ACCESS_TOKEN
  if (envToken) {
    // Save to localStorage for future use
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, envToken)
    return envToken
  }

  return null
}

/**
 * Get valid refresh token with smart initialization
 * - First time: use VITE_ZALO_REFRESH_TOKEN from env and save to localStorage
 * - After that: use localStorage token (auto-rotated when refreshing access token)
 */
export const getValidRefreshToken = (): string | null => {
  // Check localStorage first (has priority after first initialization)
  const localToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN)
  if (localToken) {
    return localToken
  }

  // Fall back to env variable (first time initialization)
  const envToken = import.meta.env.VITE_ZALO_REFRESH_TOKEN
  if (envToken) {
    // Save to localStorage for future use
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, envToken)
    return envToken
  }

  return null
}

/**
 * Refresh access token using refresh token
 */
export const refreshAccessToken = async (): Promise<string | null> => {
  const refreshToken = getValidRefreshToken()

  if (!refreshToken) {
    return null
  }

  try {
    const response = await fetch(ZALO_TOKEN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        secret_key: ZALO_APP_SECRET,
      },
      body: new URLSearchParams({
        refresh_token: refreshToken,
        app_id: ZALO_APP_ID,
        grant_type: 'refresh_token',
      }),
    })

    if (!response.ok) {
      throw new Error(`Token refresh failed: ${response.status}`)
    }

    const data = await response.json()

    if (data.error !== 0) {
      throw new Error(`Token refresh failed: ${data.error} - ${data.error_description}`)
    }

    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, data.access_token)
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, data.refresh_token)
    localStorage.setItem(STORAGE_KEYS.TOKEN_EXPIRY, (Date.now() + data.expires_in * 1000).toString())

    return data.access_token
  } catch (err) {
    return null
  }
}

/**
 * Unified API call with automatic token refresh on expiry
 */
export const fetchZaloAPI = async <T = Record<string, unknown>>(
  url: string,
  accessToken?: string,
  retryCount = 0,
): Promise<T> => {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: getAuthHeaders(accessToken),
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    const result = await response.json()

    if (result.error === TOKEN_EXPIRED_ERROR && retryCount === 0) {
      const newToken = await refreshAccessToken()
      if (newToken) {
        return fetchZaloAPI<T>(url, newToken, retryCount + 1)
      }
      throw new Error('Token expired and refresh failed')
    }

    if (result.error !== 0) {
      throw new Error(result.message || `API Error: ${result.error}`)
    }

    return result as T
  } catch (err) {
    throw err instanceof Error ? err : new Error('Unknown error occurred')
  }
}
