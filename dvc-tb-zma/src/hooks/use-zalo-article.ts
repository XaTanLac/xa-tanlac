import { ZALO_ARTICLE_API_URL } from '@/constants/zalo-oa'
import { IUseZaloArticleReturn, IZaloArticleMedia, IZaloArticlePagination, IZaloArticleResponse } from '@/types/zalo-oa'
import { fetchZaloAPI } from '@/utils/zalo-oa'
import { useState, useEffect, useCallback, useRef } from 'react'

/**
 * Custom hook to fetch Zalo OA articles with pagination support
 * @param initialOffset - Initial offset for pagination (default: 0)
 * @param initialLimit - Number of items per page (default: 10)
 * @param articleType - Type of articles to fetch (default: 'normal')
 * @param accessToken - Zalo access token for authentication
 */
const useZaloArticle = (
  initialOffset: number = 0,
  initialLimit: number = 10,
  articleType: 'normal' | 'video' = 'normal',
  accessToken?: string,
): IUseZaloArticleReturn => {
  const [data, setData] = useState<IZaloArticleMedia[]>([])
  const [total, setTotal] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(true)
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [pagination, setPagination] = useState<IZaloArticlePagination>({
    offset: initialOffset,
    limit: initialLimit,
    type: articleType,
  })

  const fetchArticles = useCallback(
    async (offset: number, limit: number, append: boolean = false) => {
      const setLoadingState = append ? setIsLoadingMore : setLoading
      setLoadingState(true)
      setError(null)

      try {
        const params = new URLSearchParams({
          offset: offset.toString(),
          limit: limit.toString(),
          type: articleType,
        })

        const url = `${ZALO_ARTICLE_API_URL}?${params.toString()}`
        const result = await fetchZaloAPI<IZaloArticleResponse>(url, accessToken)

        if (append) {
          setData((prevData) => [...prevData, ...result.data.medias])
        } else {
          setData(result.data.medias)
        }

        setTotal(result.data.total)
        setPagination((prev) => ({
          ...prev,
          offset,
          limit,
        }))
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'Something went wrong'
        setError(errorMessage)
        console.error('[Zalo] Article list fetch error:', err)
      } finally {
        setLoadingState(false)
      }
    },
    [articleType, accessToken],
  )

  useEffect(() => {
    fetchArticles(initialOffset, initialLimit, initialOffset > 0)
  }, [initialOffset])

  const loadMore = useCallback(() => {
    if (loading || data.length >= total) return

    const newOffset = pagination.offset + pagination.limit
    fetchArticles(newOffset, pagination.limit, true)
  }, [loading, data.length, total, pagination, fetchArticles])

  const refetch = useCallback(() => {
    setPagination((prev) => ({
      ...prev,
      offset: initialOffset,
    }))
    fetchArticles(initialOffset, initialLimit, false)
  }, [initialOffset, initialLimit, fetchArticles])

  const hasMore = data.length < total

  return {
    data,
    total,
    loading,
    isLoadingMore,
    error,
    hasMore,
    loadMore,
    refetch,
    pagination,
  }
}

export default useZaloArticle

/**
 * Hook to fetch article detail from Zalo API
 * @param articleId - ID of article to fetch
 * @param accessToken - Zalo access token
 */
export const useZaloArticleDetail = (
  articleId: string,
  accessToken?: string,
): [IZaloArticleMedia | null, boolean, string | null] => {
  const [data, setData] = useState<IZaloArticleMedia | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const fetchedIds = useRef<Set<string>>(new Set())

  useEffect(() => {
    if (!articleId) {
      setLoading(false)
      setError('Article ID is required')
      return
    }

    if (fetchedIds.current.has(articleId)) {
      setLoading(false)
      return
    }

    const fetchDetail = async (): Promise<void> => {
      setLoading(true)
      setError(null)

      try {
        const url = `${ZALO_ARTICLE_API_URL.replace('/getslice', '/getdetail')}?id=${articleId}`
        const result = await fetchZaloAPI<{ error: number; message: string; data: IZaloArticleMedia }>(url, accessToken)

        setData(result.data)
        fetchedIds.current.add(articleId)
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'Something went wrong'
        setError(errorMessage)
      } finally {
        setLoading(false)
      }
    }

    fetchDetail()
  }, [articleId, accessToken])

  return [data, loading, error]
}
