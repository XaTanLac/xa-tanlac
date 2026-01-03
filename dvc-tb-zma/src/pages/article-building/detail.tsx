import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import ArticleTemplateDetail from '@/components/article/article-detail'
import { BUILDING_API } from '@/constants/endpoint'
import { IArticle, useArticleDetailMemo } from '@/hooks/use-article'

const BuildingArticleDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [data, setData] = useState<IArticle>()
  const [quyHoachDetailData, loading] = useArticleDetailMemo<IArticle>(BUILDING_API.DETAIL(id || ''), {}, [])

  useEffect(() => {
    if (!loading && quyHoachDetailData) setData(quyHoachDetailData)
  }, [quyHoachDetailData, loading])

  return <ArticleTemplateDetail data={data} loading={loading} />
}

export default BuildingArticleDetailPage
