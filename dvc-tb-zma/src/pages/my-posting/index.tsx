import React, { useEffect, useMemo, useState } from 'react'
import { Box, Button, Page, useNavigate } from 'zmp-ui'

import ArticleCard from '@/components/article-card'
import NoDataSection from '@/components/no-data'
import SkeletonCard from '@/components/skeleton-card'
import { useMyPostingMemo } from '@/hooks/use-my-posting'
import { IArticle } from '@/hooks/use-news'
import DefaultHeader from '@/layouts/default-header'

const MyPostingPage: React.FC = () => {
  const [pageNumber, setPageNumber] = useState(1)
  const [listArticle, setListArticle] = useState<IArticle[]>([])
  const navigate = useNavigate()

  const [postingData, loading, metaData] = useMyPostingMemo({ pagination: { page: pageNumber, pageSize: 10 } }, [
    pageNumber,
  ])

  const isLoadMore = useMemo(() => {
    return metaData && metaData.pagination && metaData.pagination.page < metaData.pagination.pageCount
  }, [metaData])

  useEffect(() => {
    if (!loading && postingData) setListArticle((prev) => [...prev, ...postingData])
  }, [postingData, loading])

  return (
    <Page hideScrollbar className='page bg-white'>
      <DefaultHeader title='Tân Lạc của tôi' />
      {loading ? (
        [...Array(12)].map((el, index) => <SkeletonCard key={index} />)
      ) : listArticle.length > 0 ? (
        <Box mt={4} flex flexDirection='column' className='gap-3'>
          {listArticle.map((newsItem) => (
            <ArticleCard
              key={newsItem.documentId}
              {...newsItem}
              imgBanner={newsItem.imgBanner?.url}
              onClick={() => navigate(`/my-posting/${newsItem.documentId}`)}
            />
          ))}
          {isLoadMore && (
            <Button size='medium' loading={loading} onClick={() => setPageNumber((prev) => prev + 1)}>
              Tải thêm
            </Button>
          )}
        </Box>
      ) : (
        <NoDataSection />
      )}
    </Page>
  )
}

export default MyPostingPage
