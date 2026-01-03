import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import ArticleTemplateDetail from '@/components/article/article-detail'
import { NEWS_API } from '@/constants/endpoint'
import { IArticle, useArticleDetailMemo } from '@/hooks/use-article'

const NewsArticleDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [data, setData] = useState<IArticle>()
  const [newsDetailData, loading] = useArticleDetailMemo<IArticle>(NEWS_API.DETAIL(id || ''), {}, [])

  useEffect(() => {
    if (!loading && newsDetailData) setData(newsDetailData)
  }, [newsDetailData, loading])

  return <ArticleTemplateDetail data={data} loading={loading} />
}

export default NewsArticleDetailPage
