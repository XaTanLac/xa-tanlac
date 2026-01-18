import React, { useEffect, useState } from 'react'
import { useNavigate } from 'zmp-ui'

import ArticleTemplatePage from '@/components/article/article'
import { IArticle } from '@/hooks/use-article'
import useZaloArticle from '@/hooks/use-zalo-article'
import { IZaloArticleMedia } from '@/types/zalo-oa'
import { getValidAccessToken } from '@/utils/zalo-oa'

const NewsArticlePage: React.FC = (): React.ReactElement => {
  const [news, setNews] = useState<IArticle[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const navigate = useNavigate()
  const accessToken = getValidAccessToken()

  const pageSize = 10
  const offset = (currentPage - 1) * pageSize
  const { data, loading, isLoadingMore, total } = useZaloArticle(offset, pageSize, 'normal', accessToken || undefined)

  const mapZaloToArticle = (zaloArticles: IZaloArticleMedia[]): IArticle[] => {
    return zaloArticles.map((article) => ({
      documentId: article.id,
      title: article.title,
      content: `Lượt xem: ${article.total_view} | ❤️ ${article.total_like} | 💬 ${article.total_comment}`,
      isTopNews: false,
      createdAt: new Date(article.create_date).toISOString(),
      imgBanner: article.thumb
        ? {
            id: 0,
            documentId: article.id,
            name: article.title,
            url: article.thumb,
          }
        : undefined,
    }))
  }

  useEffect(() => {
    if (!loading && data && data.length > 0) {
      const mappedArticles = mapZaloToArticle(data)
      // Remove duplicates by documentId
      setNews((prevNews) => {
        const seen = new Set(prevNews.map((item) => item.documentId))
        const newArticles = mappedArticles.filter((item) => !seen.has(item.documentId))
        return [...prevNews, ...newArticles]
      })
    }
  }, [data, loading])

  const pageCount = Math.ceil(total / pageSize)
  const metaData = {
    pagination: {
      page: currentPage,
      pageSize: pageSize,
      pageCount: pageCount,
      total: total,
    },
  }

  const handleLoadMore = (): void => {
    if (currentPage < pageCount) {
      setCurrentPage((prev) => prev + 1)
    }
  }

  return (
    <ArticleTemplatePage
      title={'Thông tin từ Chính quyền'}
      data={news}
      metaData={metaData}
      onLoadMore={handleLoadMore}
      loading={loading}
      isLoadingMore={isLoadingMore}
      onClickCard={function (id: string): void {
        navigate(`/article-news/${id}`)
      }}
    />
  )
}

export default NewsArticlePage
