import React, { useEffect, useMemo, useState } from 'react'
import { Box, Button, Page, useNavigate } from 'zmp-ui'

import ArticleCard from '@/components/article-card'
import SkeletonCard from '@/components/skeleton-card'
import { IArticle } from '@/hooks/use-news'
import DefaultHeader from '@/layouts/default-header'
import NoDataSection from '@/components/no-data'
import { useFoodTravelMemo } from '@/hooks/use-food-travel'

const FoodTravelPage: React.FC = () => {
  const [pageNumber, setPageNumber] = useState(1)
  const [listArticle, setListArticle] = useState<IArticle[]>([])
  const navigate = useNavigate()

  const [newsData, loading, metaData] = useFoodTravelMemo({ pagination: { page: pageNumber, pageSize: 10 } }, [
    pageNumber,
  ])

  const isLoadMore = useMemo(() => {
    return metaData && metaData.pagination && metaData.pagination.page < metaData.pagination.pageCount
  }, [metaData])

  useEffect(() => {
    if (!loading && newsData) setListArticle((prev) => [...prev, ...newsData])
  }, [newsData, loading])

  return (
    <Page hideScrollbar className='page bg-white'>
      <DefaultHeader title='Ẩm thực - Du lịch' />
      {loading ? (
        [...Array(12)].map((el, index) => <SkeletonCard key={index} />)
      ) : listArticle.length === 0 ? (
        <NoDataSection />
      ) : (
        <Box mt={4} flex flexDirection='column' className='gap-3'>
          {listArticle.map((newsItem) => (
            <ArticleCard
              key={newsItem.documentId}
              {...newsItem}
              imgBanner={newsItem.imgBanner?.url}
              onClick={() => navigate(`/food-travel/${newsItem.documentId}`)}
            />
          ))}
          {isLoadMore && (
            <Button size='medium' loading={loading} onClick={() => setPageNumber((prev) => prev + 1)}>
              Tải thêm
            </Button>
          )}
        </Box>
      )}
    </Page>
  )
}

export default FoodTravelPage
