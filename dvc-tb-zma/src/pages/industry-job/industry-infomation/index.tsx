import React from 'react'
import { Box, Icon, Page, Text, useNavigate } from 'zmp-ui'

import MovingButton from '@/components/moving-button'
import NoDataSection from '@/components/no-data'
import SkeletonCard from '@/components/skeleton-card'
import { INDUSTRY_API } from '@/constants/endpoint'
import { useArticleMemo } from '@/hooks/use-article'
import DefaultHeader from '@/layouts/default-header'
import { IIndustry, IndustryStatus } from '@/types/industry-job'
import { formatDateDDMMYYYYhhmm, getCityFromAddress } from '@/utils/string-handler'

const ListIndustryPage: React.FC = () => {
  const navigate = useNavigate()

  const [jobPostingData, loading] = useArticleMemo<IIndustry[]>(
    INDUSTRY_API.LIST,
    { filters: { infoStatus: { $in: [IndustryStatus.ACCEPTED] } } },
    [],
  )
  return (
    <Page className='page bg-white' hideScrollbar>
      <DefaultHeader title='Thông tin doanh nghiệp' />
      {loading ? (
        [...Array(12)].map((el, index) => <SkeletonCard key={index} />)
      ) : jobPostingData.length === 0 ? (
        <NoDataSection />
      ) : (
        <Box mt={4} flex flexDirection='column' className='gap-2'>
          {jobPostingData.map((job) => (
            <IndustryCardItem key={job.documentId} {...job} />
          ))}
        </Box>
      )}
      <Box className='absolute bottom-20 right-10 z-10'>
        <MovingButton onClick={() => navigate('/industry-posting/form')}>
          <Icon icon='zi-plus' className='text-white !font-black' />
        </MovingButton>
      </Box>
    </Page>
  )
}

export const IndustryCardItem: React.FC<IIndustry> = ({ documentId, name, address, createdAt }) => {
  const navigate = useNavigate()

  return (
    <Box
      className='!p-4 shadow-sm rounded-md border-[1px]'
      key={documentId}
      onClick={() => navigate(`/industry-posting/${documentId}`)}
    >
      <Text size='large' className='!font-medium text-sky-600 break-words whitespace-normal'>
        {name}
      </Text>
      <Box mt={5} flex className='gap-2' justifyContent='space-between'>
        <Box className='!flex gap-1 items-center text-gray-700'>
          <Icon icon='zi-location-solid' size={18} />
          <Text size='xxSmall'>{getCityFromAddress(address)}</Text>
        </Box>
        <Box className='!flex gap-1 items-center text-gray-700 '>
          <Icon icon='zi-calendar-solid' size={18} />
          <Text size='xxSmall'>{formatDateDDMMYYYYhhmm(createdAt, false)}</Text>
        </Box>
      </Box>
    </Box>
  )
}

export default ListIndustryPage
