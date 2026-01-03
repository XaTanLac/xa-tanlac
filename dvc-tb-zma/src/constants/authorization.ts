// Endpoint for Zalo user info
export const ZL_ENDPOINT_GET_USER = 'https://graph.zalo.me/v2.0/me/info'

// Environment variables
export const OA_ID = import.meta.env.VITE_OA_ID || ''
export const DOMAIN = import.meta.env.VITE_URL_STRAPI || 'http://localhost:1337'
export const SECRET_KEY = import.meta.env.VITE_SECRET_KEY || ''
export const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ''

export const AuthorizedHeader = new Headers({
  Authorization: `Bearer ${import.meta.env.VITE_TOKEN_STRAPI || ''}`,
  'Content-Type': 'application/json',
  Accept: 'application/json',
})
