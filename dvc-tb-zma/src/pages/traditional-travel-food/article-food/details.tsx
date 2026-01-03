import React from 'react'
import { useParams } from 'react-router-dom'

import ArticleTemplateDetail from '@/components/article/article-detail'
import { FOOD_API } from '@/constants/endpoint'
import { IArticle, useArticleDetailMemo } from '@/hooks/use-article'

const FoodArticleDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [foodDetailData, loading] = useArticleDetailMemo<IArticle>(FOOD_API.DETAIL(id || ''), {}, [])

  return <ArticleTemplateDetail data={foodDetailData} loading={loading} />
}

export default FoodArticleDetailsPage
