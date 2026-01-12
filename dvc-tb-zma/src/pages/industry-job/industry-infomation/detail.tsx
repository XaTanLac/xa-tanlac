import Markdown from 'markdown-to-jsx'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Box, Page, Spinner, Text } from 'zmp-ui'

import { INDUSTRY_API } from '@/constants/endpoint'
import { useArticleDetailMemo } from '@/hooks/use-article'
import DefaultHeader from '@/layouts/default-header'
import { IIndustry } from '@/types/industry-job'

const IndustryDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [data, setData] = useState<IIndustry>()
  const [industryDetailData, loading] = useArticleDetailMemo<IIndustry>(INDUSTRY_API.DETAIL(id || ''), {}, [])

  useEffect(() => {
    if (!loading && industryDetailData) setData(industryDetailData)
  }, [industryDetailData, loading])

  return (
    <Page className='page bg-white' hideScrollbar>
      <DefaultHeader title={data?.name || ''} />
      {loading ? (
        <Box flex justifyContent='center' alignItems='center' className='h-screen'>
          <Spinner />
        </Box>
      ) : (
        <Box>
          <Box className='!mt-4'>
            <Text className='!text-xl !font-semibold uppercase text-green-600'>{data?.name || ''}</Text>

            <Box
              flex
              flexDirection='column'
              className='gap-1 !mt-5 !py-2 border-b-[1px] border-t-[1px] border-gray-200'
            >
              <Text size='small'>Địa chỉ: {data?.address || ''}</Text>
              <Text size='small'>Email: {data?.email || ''}</Text>
              <Text size='small'>Số điện thoại: {data?.phone || ''}</Text>
              <Text size='small'>Mã số thuế: {data?.taxCode || ''}</Text>
            </Box>
          </Box>
          <Text className='text-center mt-5 uppercase !font-medium'>Mô tả doanh nghiệp</Text>
          <Box my={4} className='article-content'>
            <Markdown className='!text-lg'>{data?.description || ''}</Markdown>
          </Box>
        </Box>
      )}
    </Page>
  )
}

export default IndustryDetailPage
