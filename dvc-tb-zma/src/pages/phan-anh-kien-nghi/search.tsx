import React, { useEffect, useRef, useState } from 'react'
import { getUserID } from 'zmp-sdk'
import { Box, Button, Icon, Input, Page, Spinner, Text, useNavigate } from 'zmp-ui'

import { usePhanAnhMemo, IPhanAnh } from '@/hooks/use-phan-anh'
import { useScrollingSticky } from '@/hooks/use-scrolling-sticky'
import DefaultHeader from '@/layouts/default-header'

const TraCuuPhanAnhPage: React.FC = () => {
  const [code, setCode] = useState('')
  const [phone, setPhone] = useState('')
  const [triggerSearch, setTriggerSearch] = useState(false)

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
        ...(code === '' ? {} : { code: { $contains: code } }),
        ...(phone === ''
          ? {}
          : {
              $or: [
                { phone: { $contains: phone } },
                { phone: { $contains: phone.startsWith('0') ? '84' + phone.slice(1) : phone } },
              ],
            }),
      },
      pagination: {
        page: pageNumber,
        pageSize: 10,
      },
      sort: ['createdAt:desc'],
    },
    [pageNumber, triggerSearch, userId],
  )

  useEffect(() => {
    if (!loading && phananhData) {
      setData((prev) => [...prev, ...phananhData])
    }
  }, [loading, phananhData])

  return (
    <Page ref={containerRef} className='page !h-screen overflow-auto relative bg-white' hideScrollbar>
      <DefaultHeader title='Tra cứu phản ánh kiến nghị' />
      <div
        ref={stickyRef}
        className='sticky z-10 bg-white transition-top duration-1000 ease-out-in'
        style={{ top: '0px' }}
      >
        <Box py={4} mb={5} flex flexDirection='column' className='gap-3'>
          <Text className='uppercase text-center text-sky-600' bold>
            <div className='text-2xl'>Tra cứu phản ánh kiến nghị</div>
          </Text>
        </Box>
        <Box pb={4}>
          <Box mb={4}>
            <Box className='relative'>
              <Input
                type='number'
                placeholder='Nhập số điện thoại'
                size='medium'
                clearable
                onChange={(event) => setPhone(event.target.value)}
              />
              <Input
                placeholder='Nhập mã phản ánh'
                size='medium'
                clearable
                onChange={(event) => setCode(event.target.value)}
              />
            </Box>
          </Box>
          <Box>
            <Button
              variant='primary'
              fullWidth
              suffixIcon={<Icon icon='zi-search' />}
              onClick={() => {
                if (loading) return
                setData([])
                setPageNumber(1)
                setTriggerSearch((prev) => !prev)
              }}
            >
              Tra cứu
            </Button>
          </Box>
        </Box>
      </div>
      <Box pt={8} className='border-b' />
      <Box mt={8}>
        <Text size='xLarge' bold>
          Danh sách phản ánh
        </Text>
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

export const PACard: React.FC<{ phanAnh: IPhanAnh; index: number }> = ({ phanAnh, index }) => {
  const navigate = useNavigate()

  return (
    <Box
      key={phanAnh.documentId}
      px={3}
      py={4}
      className='border-b'
      style={{
        backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#ffffff',
      }}
      onClick={() => {
        navigate(`/phan-anh-kien-nghi/${phanAnh.documentId}`)
      }}
    >
      <Box className='space-y-2'>
        <Text className='text-gray-600 mb-4 space-y-1'>
          <span className='font-semibold text-gray-800'>Phản ánh: </span>
          <Box className='text-ellipsis !line-clamp-3 overflow-hidden'>{phanAnh.description}</Box>
        </Text>
        <Text className='font-semibold text-blue-600'>
          <span className='font-semibold text-gray-800'>Loại phản ánh: </span>
          {phanAnh.type.type}
        </Text>
        <Text className='font-semibold text-blue-600'>
          <span className='font-semibold text-gray-800'>Mã phản ánh: </span>
          {phanAnh.code}
        </Text>
        <Text className='text-gray-600'>
          <span className='font-semibold text-gray-800'>Ngày phản ánh: </span>
          {new Date(phanAnh.createdAt).toLocaleDateString('en-GB')}
        </Text>
        <Text
          className={`${phanAnh.processing_status === 'Đang xử lý' ? 'text-yellow-600' : phanAnh.processing_status === 'Đã hủy' ? 'text-red-600' : 'text-green-600'}`}
        >
          <span className='font-semibold text-gray-800'>Trạng thái: </span>
          {phanAnh.processing_status}
        </Text>
      </Box>
    </Box>
  )
}

export const PACardSkeleton: React.FC = () => {
  return (
    <Box px={3} py={4} className='border-b !bg-gray-50'>
      <Box className='space-y-2'>
        <Text className='text-transparent mb-4 space-y-1 bg-gray-200 !w-fit animate-pulse rounded-lg'>
          <span className='font-semibold text-transparent'>Phản ánh: </span>
        </Text>
        <Box className='text-ellipsis !line-clamp-3 overflow-hidden bg-gray-200 animate-pulse rounded-lg' py={8}></Box>
        <Text className='font-semibold text-transparent bg-gray-200 !w-fit animate-pulse rounded-lg'>
          <span className='font-semibold text-transparent'>Mã phản ánh: </span>
          {'HS-dd-mm-yy-001'}
        </Text>
        <Text className='text-transparent bg-gray-200 !w-fit animate-pulse rounded-lg'>
          <span className='font-semibold text-transparent'>Ngày phản ánh: </span>
          {'dd/mm/yyyy'}
        </Text>
        <Text className='text-transparent bg-gray-200 !w-fit animate-pulse rounded-lg'>
          <span className='font-semibold text-transparent'>Trạng thái: </span>
          {'Đang xử lý'}
        </Text>
      </Box>
    </Box>
  )
}

export default TraCuuPhanAnhPage
