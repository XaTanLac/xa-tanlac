import React, { useEffect, useState } from 'react'
import { useNavigate } from 'zmp-ui'

import ArticleTemplatePage from '@/components/article/article'
import { NEWS_API } from '@/constants/endpoint'
import { IArticle, useArticleMemo } from '@/hooks/use-article'

const NewsArticlePage: React.FC = () => {
  const [pageNumber, setPageNumber] = useState(1)
  const [news, setNews] = useState<IArticle[]>([])
  const navigate = useNavigate()

  const [newsData, loading, metaData] = useArticleMemo<IArticle[]>(
    NEWS_API.LIST,
    { pagination: { page: pageNumber, pageSize: 10 } },
    [pageNumber],
  )

  useEffect(() => {
    if (!loading && newsData) setNews((prev) => [...prev, ...newsData])
  }, [newsData, loading])

  return (
    <ArticleTemplatePage
      title={'Thông tin từ Chính quyền'}
      data={news}
      metaData={metaData}
      onLoadMore={() => setPageNumber((prev) => prev + 1)}
      loading={loading}
      onClickCard={function (id: string): void {
        navigate(`/article-news/${id}`)
      }}
    />
  )
}

export default NewsArticlePage
