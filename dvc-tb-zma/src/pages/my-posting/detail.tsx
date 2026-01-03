import Markdown from 'markdown-to-jsx'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Box, Icon, Page, Spinner, Text } from 'zmp-ui'

import { useMyPostingDetailMemo } from '@/hooks/use-my-posting'
import { IArticle } from '@/hooks/use-news'
import DefaultHeader from '@/layouts/default-header'
import { formatDateDDMMYYYYhhmm } from '@/utils/string-handler'

const MyPostingDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [data, setData] = useState<IArticle>()
  const [postingDetailData, loading] = useMyPostingDetailMemo(id || '', {}, [])

  useEffect(() => {
    if (!loading && postingDetailData) setData(postingDetailData)
  }, [postingDetailData, loading])

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
              <img className={'object-cover h-64 w-screen'} src={data?.imgBanner.url || ''} alt='News banner' />
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
          <Box px={4} mt={10} className='article-content !pb-1'>
            <Markdown>{data?.content || ''}</Markdown>
          </Box>
        </Box>
      )}
    </Page>
  )
}

export default MyPostingDetailPage
