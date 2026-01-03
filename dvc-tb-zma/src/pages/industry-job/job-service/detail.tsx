import Markdown from 'markdown-to-jsx'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Box, Page, Spinner, Text } from 'zmp-ui'

import { IJobPosting, useJobPostingDetailMemo } from '@/hooks/use-job-posting'
import DefaultHeader from '@/layouts/default-header'
import { formatDateDDMMYYYYhhmm } from '@/utils/string-handler'

const JobPostingDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [data, setData] = useState<IJobPosting>()
  const [jobPostingDetailData, loading] = useJobPostingDetailMemo(id || '', {}, [])

  useEffect(() => {
    if (!loading && jobPostingDetailData) setData(jobPostingDetailData)
  }, [jobPostingDetailData, loading])

  return (
    <Page className='page bg-white' hideScrollbar>
      <DefaultHeader title={data?.title || ''} />
      {loading ? (
        <Box flex justifyContent='center' alignItems='center' className='h-screen'>
          <Spinner />
        </Box>
      ) : (
        <Box>
          <Box className='!mt-4'>
            <Text className='!text-xl !font-semibold uppercase text-sky-600'>{data?.title || ''}</Text>
            <Box className='!my-1'>
              <Box className='!flex gap-1 items-center text-gray-600'>
                <Text size='xSmall'>Ngày đăng: {formatDateDDMMYYYYhhmm(data?.createdAt || new Date(), false)}</Text>
              </Box>
            </Box>
            <Box
              flex
              flexDirection='column'
              className='gap-1 !mt-5 !py-2 border-b-[1px] border-t-[1px] border-gray-200'
            >
              <Text size='small'>Công ty: {data?.company || ''}</Text>
              <Text size='small'>Địa điểm: {data?.address || ''}</Text>
            </Box>
          </Box>
          <Box mt={8} mb={4} className='article-content'>
            <Markdown className='!text-lg'>{data?.description || ''}</Markdown>
          </Box>
        </Box>
      )}
    </Page>
  )
}

export default JobPostingDetailPage
