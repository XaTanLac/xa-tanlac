import React, { useEffect, useState } from 'react'
import { useNavigate } from 'zmp-ui'

import ArticleTemplatePage from '@/components/article/article'
import { IArticle, useArticleMemo } from '@/hooks/use-article'
import { BUILDING_API } from '@/constants/endpoint'

const BuildingArticlePage: React.FC = () => {
  const [pageNumber, setPageNumber] = useState(1)
  const [listQuyHoach, setListQuyHoach] = useState<IArticle[]>([])
  const navigate = useNavigate()

  const [data, loading, metaData] = useArticleMemo<IArticle[]>(
    BUILDING_API.LIST,
    { pagination: { page: pageNumber, pageSize: 10 } },
    [pageNumber],
  )

  useEffect(() => {
    if (!loading && data) setListQuyHoach((prev) => [...prev, ...data])
  }, [data, loading])

  return (
    <ArticleTemplatePage
      title={'Quy hoạch - Xây dựng - Môi trường'}
      data={listQuyHoach}
      metaData={metaData}
      loading={loading}
      onLoadMore={() => setPageNumber((prev) => prev + 1)}
      onClickCard={function (id: string): void {
        navigate(`/article-building/${id}`)
      }}
    />
  )
}

export default BuildingArticlePage
