import React, { useEffect, useState } from 'react'
import { useNavigate } from 'zmp-ui'

import ArticleTemplatePage from '@/components/article/article'
import { TRAVEL_API } from '@/constants/endpoint'
import { IArticle, useArticleMemo } from '@/hooks/use-article'

const TravelArticlePage: React.FC = () => {
  const [pageNumber, setPageNumber] = useState(1)
  const [listTravel, setListTravel] = useState<IArticle[]>([])
  const navigate = useNavigate()

  const [data, loading, metaData] = useArticleMemo<IArticle[]>(
    TRAVEL_API.LIST,
    { pagination: { page: pageNumber, pageSize: 10 } },
    [pageNumber],
  )

  useEffect(() => {
    if (!loading && data) setListTravel((prev) => [...prev, ...data])
  }, [data, loading])

  return (
    <ArticleTemplatePage
      title='Du lịch'
      data={listTravel}
      metaData={metaData}
      loading={loading}
      onLoadMore={() => setPageNumber((prev) => prev + 1)}
      onClickCard={(id) => {
        navigate(`/article-travel/${id}`)
      }}
    />
  )
}

export default TravelArticlePage
