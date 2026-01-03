import React, { useEffect, useState } from 'react'
import { useNavigate } from 'zmp-ui'

import ArticleTemplatePage from '@/components/article/article'
import { CULTURE_API } from '@/constants/endpoint'
import { IArticle, useArticleMemo } from '@/hooks/use-article'

const CultureArticlePage: React.FC = () => {
  const [pageNumber, setPageNumber] = useState(1)
  const [listCulture, setListCulture] = useState<IArticle[]>([])
  const navigate = useNavigate()

  const [data, loading, metaData] = useArticleMemo<IArticle[]>(
    CULTURE_API.LIST,
    { pagination: { page: pageNumber, pageSize: 10 } },
    [pageNumber],
  )

  useEffect(() => {
    if (!loading && data) setListCulture((prev) => [...prev, ...data])
  }, [data, loading])

  return (
    <ArticleTemplatePage
      title='Văn hóa'
      data={listCulture}
      metaData={metaData}
      loading={loading}
      onLoadMore={() => setPageNumber((prev) => prev + 1)}
      onClickCard={(id) => {
        navigate(`/article-culture/${id}`)
      }}
    />
  )
}

export default CultureArticlePage
