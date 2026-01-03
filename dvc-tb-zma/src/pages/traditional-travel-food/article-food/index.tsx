import React, { useEffect, useState } from 'react'
import { useNavigate } from 'zmp-ui'

import ArticleTemplatePage from '@/components/article/article'
import { FOOD_API } from '@/constants/endpoint'
import { IArticle, useArticleMemo } from '@/hooks/use-article'

const FoodArticlePage: React.FC = () => {
  const [pageNumber, setPageNumber] = useState(1)
  const [listFood, setListFood] = useState<IArticle[]>([])
  const navigate = useNavigate()

  const [data, loading, metaData] = useArticleMemo<IArticle[]>(
    FOOD_API.LIST,
    { pagination: { page: pageNumber, pageSize: 10 } },
    [pageNumber],
  )

  useEffect(() => {
    if (!loading && data) setListFood((prev) => [...prev, ...data])
  }, [data, loading])

  return (
    <ArticleTemplatePage
      title='Ẩm thực'
      data={listFood}
      metaData={metaData}
      loading={loading}
      onLoadMore={() => setPageNumber((prev) => prev + 1)}
      onClickCard={(id) => {
        navigate(`/article-food/${id}`)
      }}
    />
  )
}

export default FoodArticlePage
