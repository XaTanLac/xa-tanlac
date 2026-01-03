import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import ArticleTemplateDetail from '@/components/article/article-detail'
import { MY_POSTING_API } from '@/constants/endpoint'
import { IArticle, useArticleDetailMemo } from '@/hooks/use-article'

const PostingArticleDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [data, setData] = useState<IArticle>()
  const [postingDetailData, loading] = useArticleDetailMemo<IArticle>(MY_POSTING_API.DETAIL(id || ''), {}, [])

  useEffect(() => {
    if (!loading && postingDetailData) setData(postingDetailData)
  }, [postingDetailData, loading])

  return <ArticleTemplateDetail data={data} loading={loading} />
}

export default PostingArticleDetailPage
