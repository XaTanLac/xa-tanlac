import Markdown from 'markdown-to-jsx'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Box, Icon, Page, Spinner, Text } from 'zmp-ui'

import { IArticle } from '@/hooks/use-news'
import { useQuyHoachDetailMemo } from '@/hooks/use-quy-hoach'
import DefaultHeader from '@/layouts/default-header'
import { formatDateDDMMYYYYhhmm } from '@/utils/string-handler'

const QuyHoachDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [data, setData] = useState<IArticle>()
  const [quyHoachDetailData, loading] = useQuyHoachDetailMemo(id || '', {}, [])

  useEffect(() => {
    if (!loading && quyHoachDetailData) setData(quyHoachDetailData)
  }, [quyHoachDetailData, loading])

  return (
    <Page className='bg-white' hideScrollbar>
      <DefaultHeader title={data?.title || ''} />
      {loading ? (
        <Box flex justifyContent='center' alignItems='center' className='h-screen'>
          <Spinner />
        </Box>
      ) : (
        <Box>
          {data?.imgBanner && (
            <Box>
              <img className={'object-cover w-full'} src={data?.imgBanner.url || ''} alt='News banner' />
            </Box>
          )}
          <Box px={4} className='!mt-7'>
            <Text className='!text-xl !font-semibold uppercase'>{data?.title || ''}</Text>
            <Box className='!my-2'>
              <Box className='!flex gap-1 items-center text-gray-700'>
                <Icon icon='zi-calendar' size={18} />
                <Text className='!text-sm'>{formatDateDDMMYYYYhhmm(data?.createdAt || new Date())}</Text>
              </Box>
            </Box>
          </Box>
          <Box px={4} mt={10} mb={4} className='article-content'>
            <Markdown>{data?.content || ''}</Markdown>
          </Box>
        </Box>
      )}
    </Page>
  )
}

export default QuyHoachDetailPage
