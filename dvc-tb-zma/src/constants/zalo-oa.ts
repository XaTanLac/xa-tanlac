export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'zalo_oa_access_token',
  REFRESH_TOKEN: 'zalo_oa_refresh_token',
  TOKEN_EXPIRY: 'zalo_oa_token_expiry',
}

export const ZALO_ARTICLE_API_URL = 'https://openapi.zalo.me/v2.0/article/getslice'
export const ZALO_TOKEN_URL = 'https://oauth.zaloapp.com/v4/oa/access_token'

export const TOKEN_EXPIRED_ERROR = -220
export const API_ERROR_INVALID_APP_ID = -14002

// Get Zalo App ID from environment variables
export const ZALO_APP_ID = import.meta.env.VITE_OA_ID || '1604215073755198968'

// Get Zalo App Secret from environment variables
export const ZALO_APP_SECRET = import.meta.env.VITE_OA_SECRET || ''
