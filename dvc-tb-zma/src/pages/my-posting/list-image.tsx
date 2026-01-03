import React, { useEffect, useMemo, useState } from 'react'
import { Box, Button, Page, useNavigate } from 'zmp-ui'

import NoDataSection from '@/components/no-data'
import SkeletonCard from '@/components/skeleton-card'
import { IImagePosting, useMyImagePostingMemo } from '@/hooks/use-my-posting'
import DefaultHeader from '@/layouts/default-header'
import { formatDateDDMMYYYYhhmm } from '@/utils/string-handler'

const ImagePostingPage: React.FC = () => {
  const [listImage, setListImage] = useState<IImagePosting[]>([])
  const [pageNumber, setPageNumber] = useState(1)

  const [data, loading, metaData] = useMyImagePostingMemo({ pagination: { page: pageNumber, pageSize: 10 } }, [
    pageNumber,
  ])

  const isLoadMore = useMemo(() => {
    return metaData && metaData.pagination && metaData.pagination.page < metaData.pagination.pageCount
  }, [metaData])

  const getImagesByDate = useMemo(() => {
    const groupedByDate: { [key: string]: IImagePosting[] } = {}

    listImage.forEach((image) => {
      const date = formatDateDDMMYYYYhhmm(image.createdAt, false)
      if (!groupedByDate[date]) {
        groupedByDate[date] = []
      }
      groupedByDate[date].push(image)
    })

    return groupedByDate
  }, [listImage])

  useEffect(() => {
    if (!loading && data) setListImage((prev) => [...prev, ...data])
  }, [data, loading])

  return (
    <Page hideScrollbar className='page bg-white'>
      <DefaultHeader title='Hình ảnh' />
      {loading ? (
        [...Array(12)].map((el, index) => <SkeletonCard key={index} />)
      ) : Object.keys(getImagesByDate).length > 0 ? (
        <Box mt={4} flex flexDirection='column' className='gap-3'>
          {Object.entries(getImagesByDate).map(([date, images]) => (
            <ListImageByDate key={date} date={date} listImagePosting={images} />
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

const ListImageByDate: React.FC<{ date: string; listImagePosting: IImagePosting[] }> = ({ date, listImagePosting }) => {
  const navigate = useNavigate()

  if (listImagePosting.length === 0) return null

  return (
    <Box mt={2}>
      <h3 className='text-sm font-semibold'>{date}</h3>
      <Box mt={3} className='!grid grid-cols-3 gap-2'>
        {listImagePosting.map((item) => (
          <Box
            key={item.documentId}
            className='border'
            onClick={() => navigate(`/my-posting/images/${item.documentId}`)}
          >
            <img src={item.img.url} alt={item.title} className='h-24 w-full object-cover' />
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default ImagePostingPage
