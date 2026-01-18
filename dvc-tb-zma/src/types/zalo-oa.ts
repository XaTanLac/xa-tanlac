export interface IZaloArticleMedia {
  id: string
  type: string
  title: string
  status: string
  total_view: number
  total_share: number
  total_like: number
  total_comment: number
  create_date: number
  update_date: number
  thumb: string
  link_view: string
}

export interface IZaloArticleResponse {
  error: number
  message: string
  data: {
    medias: IZaloArticleMedia[]
    total: number
  }
}

export interface IZaloArticlePagination {
  offset: number
  limit: number
  type?: 'normal' | 'video'
}

export interface IUseZaloArticleReturn {
  data: IZaloArticleMedia[]
  total: number
  loading: boolean
  isLoadingMore: boolean
  error: string | null
  hasMore: boolean
  loadMore: () => void
  refetch: () => void
  pagination: IZaloArticlePagination
}
