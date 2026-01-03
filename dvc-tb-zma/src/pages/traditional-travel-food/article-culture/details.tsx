import React from 'react'
import { useParams } from 'react-router-dom'

import ArticleTemplateDetail from '@/components/article/article-detail'
import { CULTURE_API } from '@/constants/endpoint'
import { IArticle, useArticleDetailMemo } from '@/hooks/use-article'

const CultureArticleDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [cultureDetailData, loading] = useArticleDetailMemo<IArticle>(CULTURE_API.DETAIL(id || ''), {}, [])

  return <ArticleTemplateDetail data={cultureDetailData} loading={loading} />
}

export default CultureArticleDetailsPage
