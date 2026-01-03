import React, { useEffect, useState } from 'react'
import { useNavigate } from 'zmp-ui'

import ArticleTemplatePage from '@/components/article/article'
import { MY_POSTING_API } from '@/constants/endpoint'
import { IArticle, useArticleMemo } from '@/hooks/use-article'

const PostingArticlePage: React.FC = () => {
  const [pageNumber, setPageNumber] = useState(1)
  const [listArticle, setListArticle] = useState<IArticle[]>([])
  const navigate = useNavigate()

  const [postingData, loading, metaData] = useArticleMemo<IArticle[]>(
    MY_POSTING_API.LIST,
    { pagination: { page: pageNumber, pageSize: 10 } },
    [pageNumber],
  )

  useEffect(() => {
    if (!loading && postingData) setListArticle((prev) => [...prev, ...postingData])
  }, [postingData, loading])

  return (
    <ArticleTemplatePage
      title={'Vĩnh Hòa của tôi'}
      data={listArticle}
      metaData={metaData}
      loading={loading}
      onLoadMore={() => setPageNumber((prev) => prev + 1)}
      onClickCard={function (id: string): void {
        navigate(`/my-posting/${id}`)
      }}
    />
  )
}

export default PostingArticlePage
