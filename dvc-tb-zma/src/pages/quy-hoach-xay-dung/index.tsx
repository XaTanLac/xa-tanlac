import React, { useEffect, useMemo, useState } from 'react'
import { Box, Button, Page, useNavigate } from 'zmp-ui'

import ArticleCard from '@/components/article-card'
import NoDataSection from '@/components/no-data'
import SkeletonCard from '@/components/skeleton-card'
import { IArticle } from '@/hooks/use-news'
import { useQuyHoachMemo } from '@/hooks/use-quy-hoach'
import DefaultHeader from '@/layouts/default-header'

const QuyHoachPage: React.FC = () => {
  const [pageNumber, setPageNumber] = useState(1)
  const [listQuyHoach, setListQuyHoach] = useState<IArticle[]>([])
  const navigate = useNavigate()

  const [quyHoachData, loading, metaData] = useQuyHoachMemo({ pagination: { page: pageNumber, pageSize: 10 } }, [
    pageNumber,
  ])

  const isLoadMore = useMemo(() => {
    return metaData && metaData.pagination && metaData.pagination.page < metaData.pagination.pageCount
  }, [metaData])

  useEffect(() => {
    if (!loading && quyHoachData) setListQuyHoach((prev) => [...prev, ...quyHoachData])
  }, [quyHoachData, loading])

  return (
    <Page hideScrollbar className='page bg-white'>
      <DefaultHeader title='Quy hoạch - Xây dựng - Môi trường' />
      {loading ? (
        [...Array(12)].map((el, index) => <SkeletonCard key={index} />)
      ) : listQuyHoach.length === 0 ? (
        <NoDataSection />
      ) : (
        <Box flex flexDirection='column' className='gap-3' mt={4}>
          {listQuyHoach.map((quyHoach) => (
            <ArticleCard
              key={quyHoach.documentId}
              {...quyHoach}
              imgBanner={quyHoach.imgBanner?.url}
              onClick={() => navigate(`/quy-hoach-xay-dung/${quyHoach.documentId}`)}
            />
          ))}
          {isLoadMore && (
            <Button loading={loading} onClick={() => setPageNumber((prev) => prev + 1)}>
              Tải thêm
            </Button>
          )}
        </Box>
      )}
    </Page>
  )
}

export default QuyHoachPage
