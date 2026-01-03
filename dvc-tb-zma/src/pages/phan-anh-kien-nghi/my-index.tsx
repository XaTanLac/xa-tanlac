import React, { useEffect, useRef, useState } from 'react'
import { getUserID } from 'zmp-sdk'
import { Box, Button, Page, Spinner, Text } from 'zmp-ui'

import { usePhanAnhMemo, IPhanAnh } from '@/hooks/use-phan-anh'
import { useScrollingSticky } from '@/hooks/use-scrolling-sticky'
import DefaultHeader from '@/layouts/default-header'

import { PACard, PACardSkeleton } from './search'

const PhanAnhCuaToiPage: React.FC = () => {
  const [data, setData] = useState<IPhanAnh[]>([])
  const [pageNumber, setPageNumber] = useState(1)
  const [userId, setUserId] = useState('')

  // Refs for scrolling sticky header
  const containerRef = useRef<HTMLDivElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  useScrollingSticky(containerRef, stickyRef)

  useEffect(() => {
    getUserID({
      success: (id) => {
        setUserId(id)
      },
    })
  }, [])

  const [phananhData, loading, meta] = usePhanAnhMemo(
    {
      filters: {
        $or: [{ zalo_id: { $eq: userId } }],
      },
      pagination: {
        page: pageNumber,
        pageSize: 2,
      },
      sort: ['createdAt:desc'],
    },
    [pageNumber, userId],
  )

  useEffect(() => {
    if (phananhData && userId) {
      setData((prev) => [...prev, ...phananhData])
    }
  }, [phananhData, userId])

  return (
    <Page ref={containerRef} className='page !h-screen overflow-auto relative bg-white' hideScrollbar>
      <DefaultHeader title='Phản ánh kiến nghị của tôi' />
      <Box mt={4}>
        <Box flexDirection='column' mt={5} className='px-6'>
          {loading ? (
            [...Array(10)].map((el, index) => <PACardSkeleton key={index} />)
          ) : data.length > 0 ? (
            <>
              {data.map((phanAnh, index) => (
                <PACard phanAnh={phanAnh} index={index} key={phanAnh.documentId} />
              ))}
              {loading && (
                <Box flex justifyContent='center' alignItems='center' mt={4}>
                  <Spinner />
                </Box>
              )}
              {pageNumber < meta?.pagination.pageCount && (
                <Button
                  className='!mt-4'
                  loading={loading}
                  onClick={() => {
                    setPageNumber((prev) => prev + 1)
                  }}
                >
                  Tải thêm
                </Button>
              )}
            </>
          ) : (
            <Box flex justifyContent='center' alignItems='center' mt={4}>
              <Text className='text-gray-500'>Không có dữ liệu</Text>
            </Box>
          )}
        </Box>
      </Box>
    </Page>
  )
}

export default PhanAnhCuaToiPage
