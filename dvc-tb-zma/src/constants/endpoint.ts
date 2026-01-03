export const CULTURE_API = {
  LIST: '/api/cultures',
  DETAIL: (id: string) => `/api/cultures/${id}`,
}

export const FOOD_API = {
  LIST: '/api/foods',
  DETAIL: (id: string) => `/api/foods/${id}`,
}

export const TRAVEL_API = {
  LIST: '/api/travels',
  DETAIL: (id: string) => `/api/travels/${id}`,
}

export const PUBLIC_INFO_API = {
  LIST: '/api/public-infos',
  DETAIL: (id: string) => `/api/public-infos/${id}`,
}

export const BUILDING_API = {
  LIST: '/api/planning-construction-environments',
  DETAIL: (id: string) => `/api/planning-construction-environments/${id}`,
}

export const NEWS_API = {
  LIST: '/api/articles',
  DETAIL: (id: string) => `/api/articles/${id}`,
}

export const MY_POSTING_API = {
  LIST: '/api/my-postings',
  DETAIL: (id: string) => `/api/my-postings/${id}`,
  IMAGE: '/api/my-image-postings',
  IMAGE_DETAILS: (id: string) => `/api/my-image-postings/${id}`,
  AUDIO: '/api/my-audio-postings',
  AUDIO_DETAILS: (id: string) => `/api/my-audio-postings/${id}`,
}

export const INDUSTRY_API = {
  LIST: '/api/companies',
  DETAIL: (id: string) => `/api/companies/${id}`,
}
