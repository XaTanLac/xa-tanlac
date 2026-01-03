import React, { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { Box, Center, Icon, Page, Spinner, Swiper, Text } from 'zmp-ui'

import { openPageInWebview } from '@/constants'
import { IPhanAnh, usePhanAnhDetailMemo } from '@/hooks/use-phan-anh'
import DefaultHeader from '@/layouts/default-header'
import Markdown from 'react-markdown'

const PhanAnhDetailPage: React.FC = () => {
  const phananhIdParams = useParams()

  const [detail, loading] = usePhanAnhDetailMemo(phananhIdParams.id ?? '-1', { populate: '*' }, [])

  return (
    <Page hideScrollbar className=''>
      <DefaultHeader title={'Chi tiết phản ánh'} />
      {loading ? (
        <Box flex justifyContent='center' alignItems='center' className='h-screen'>
          <Spinner />
        </Box>
      ) : (
        <Center gutters='6px'>
          <Box flex flexDirection='column' className='gap-4' mt={10}>
            {loading && <CardSkeleton />}
            {detail && (
              <Box className='space-y-2'>
                <DetailCard detail={detail} />
                {detail.reply && <ReplyCard detail={detail} />}
              </Box>
            )}
          </Box>
        </Center>
      )}
    </Page>
  )
}

const DetailCard: React.FC<{ detail: IPhanAnh }> = ({ detail }) => {
  const imageRegex = useMemo(() => /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i, [])
  const images = useMemo(
    () => detail?.files?.filter((el) => imageRegex.test(el.ext) === true) ?? [],
    [detail?.files, imageRegex],
  )
  const files = useMemo(
    () => detail?.files?.filter((el) => imageRegex.test(el.ext) === false) ?? [],
    [detail?.files, imageRegex],
  )

  return (
    <Box className='space-y-3 bg-white rounded' px={3} py={4}>
      <Box>
        <Text className='text-gray-500'>
          Phản ánh vào lúc
          {new Date(detail.createdAt).toLocaleDateString('en-GB', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Text>
        <Text className='text-gray-500'>Loại: {detail.type.type}</Text>
      </Box>
      <Text size='large'>{detail.description}</Text>
      {images.length > 0 && (
        <Box>
          <Swiper
            autoplay={images.length > 1}
            loop={images.length > 1}
            dots={images.length > 1}
            className='!rounded-lg'
          >
            {images.map((image) => (
              <Swiper.Slide key={image.hash} className='relative'>
                <img src={image.url} alt={image.alternativeText || image.name} className='object-cover h-full w-full' />
              </Swiper.Slide>
            ))}
          </Swiper>
        </Box>
      )}
      {files.length > 0 && (
        <Box py={4}>
          <Text bold>Tài liệu đính kèm</Text>
          <Box className='space-y-2' mt={2}>
            {files?.map((file) => (
              <Box
                key={file.hash}
                flex
                alignItems='center'
                p={3}
                className='border bg-slate-100 rounded-lg space-x-2'
                onClick={() => {
                  openPageInWebview(`${file.url}`)
                }}
              >
                <Icon icon='zi-link' size={20} />
                <Text>{file.name}</Text>
              </Box>
            ))}
          </Box>
        </Box>
      )}
      <Text
        className={`text-right ${detail.processing_status === 'Đang xử lý' ? 'text-yellow-600' : detail.processing_status === 'Đã hủy' ? 'text-red-600' : 'text-green-600'}`}
      >
        {detail.processing_status}
      </Text>
    </Box>
  )
}

const ReplyCard = ({ detail }) => {
  const imageRegex = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i
  const images = useMemo(() => detail?.answer_files?.filter((el) => imageRegex.test(el.ext) === true) ?? [], [detail])
  const files = useMemo(() => detail?.answer_files?.filter((el) => imageRegex.test(el.ext) === false) ?? [], [detail])

  return (
    <Box className='space-y-3 bg-white rounded' mt={3} px={3} py={4}>
      <Text className='text-gray-500'>
        Trả lời vào lúc{' '}
        {new Date(detail.updatedAt).toLocaleDateString('en-GB', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
        })}
      </Text>
      <Markdown>{detail.reply}</Markdown>
      {images.length > 0 && (
        <Box>
          <Swiper
            autoplay={images.length > 1}
            loop={images.length > 1}
            dots={images.length > 1}
            className='!rounded-lg'
          >
            {images.map((image) => (
              <Swiper.Slide key={image.hash} className='relative'>
                <img src={image.url} alt={image.alternativeText || image.name} className='object-cover h-full w-full' />
              </Swiper.Slide>
            ))}
          </Swiper>
        </Box>
      )}
      {files.length > 0 && (
        <Box py={4}>
          <Text bold>Tài liệu đính kèm</Text>
          <Box className='space-y-2' mt={2}>
            {files?.map((file) => (
              <Box
                key={file.hash}
                flex
                alignItems='center'
                p={3}
                className='border bg-slate-100 rounded-lg space-x-2'
                onClick={() => {
                  openPageInWebview(file.url)
                }}
              >
                <Icon icon='zi-link' size={20} />
                <Text>{file.name}</Text>
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  )
}

const CardSkeleton: React.FC = () => {
  return (
    <Box className='space-y-3 bg-gray-50 rounded' px={3} py={4}>
      <Text className='text-transparent bg-gray-200 rounded-lg animate-pulse'>
        Phản ánh vào lúc{' dd/mm/yyyy, hh:mi'}
      </Text>
      <Text size='large' className='py-8 text-transparent bg-gray-200 !mt-4 rounded-lg animate-pulse'>
        description
      </Text>
      <Text className='text-right text-transparent'>
        <span className='bg-gray-200 rounded-lg animate-pulse'>{'Đang xử lý'}</span>
      </Text>
    </Box>
  )
}

export default PhanAnhDetailPage
