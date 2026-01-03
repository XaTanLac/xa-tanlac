import React, { useEffect, useState } from 'react'
import { useNavigate } from 'zmp-ui'

import ArticleTemplatePage from '@/components/article/article'
import { PUBLIC_INFO_API } from '@/constants/endpoint'
import { IPublicInfo, useArticleMemo } from '@/hooks/use-article'

const PublicArticlePage: React.FC = () => {
  const [pageNumber, setPageNumber] = useState(1)
  const [listArticle, setListArticle] = useState<IPublicInfo[]>([])
  const navigate = useNavigate()

  const [data, loading, metaData] = useArticleMemo<IPublicInfo[]>(
    PUBLIC_INFO_API.LIST,
    { pagination: { page: pageNumber, pageSize: 10 } },
    [pageNumber],
  )

  useEffect(() => {
    if (!loading && data) setListArticle((prev) => [...prev, ...data])
  }, [data, loading])

  return (
    <ArticleTemplatePage
      title={'Thông tin công khai'}
      data={listArticle}
      metaData={metaData}
      loading={loading}
      onLoadMore={() => setPageNumber((prev) => prev + 1)}
      onClickCard={(id) => navigate(`/article-public/${id}`)}
    />
  )
}

export default PublicArticlePage
