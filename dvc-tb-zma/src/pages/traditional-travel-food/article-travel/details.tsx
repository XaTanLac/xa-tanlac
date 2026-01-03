import React from 'react'
import { useParams } from 'react-router-dom'

import ArticleTemplateDetail from '@/components/article/article-detail'
import { TRAVEL_API } from '@/constants/endpoint'
import { IArticle, useArticleDetailMemo } from '@/hooks/use-article'

const TravelArticleDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [travelDetailData, loading] = useArticleDetailMemo<IArticle>(TRAVEL_API.DETAIL(id || ''), {}, [])

  return <ArticleTemplateDetail data={travelDetailData} loading={loading} />
}

export default TravelArticleDetailsPage
