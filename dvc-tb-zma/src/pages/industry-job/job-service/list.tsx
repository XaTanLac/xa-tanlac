import React from 'react'
import { Box, Button, Icon, Page, Text, useNavigate } from 'zmp-ui'

import NoDataSection from '@/components/no-data'
import SkeletonCard from '@/components/skeleton-card'
import {
  IJobPosting,
  IJobPostingUpdate,
  JOB_STATUS_CONFIG,
  JobPostingStatus,
  useJobPostingMemo,
} from '@/hooks/use-job-posting'
import DefaultHeader from '@/layouts/default-header'
import { cn, formatDateDDMMYYYYhhmm, getCityFromAddress } from '@/utils/string-handler'

const ListJobPostingPage: React.FC = () => {
  const [jobPostingData, loading] = useJobPostingMemo(
    { filters: { postingStatus: { $in: [JobPostingStatus.OPEN] } } },
    [],
  )
  return (
    <Page className='page bg-white' hideScrollbar>
      <DefaultHeader title='Danh sách tuyển dụng' />
      {loading ? (
        [...Array(12)].map((el, index) => <SkeletonCard key={index} />)
      ) : jobPostingData.length === 0 ? (
        <NoDataSection />
      ) : (
        <Box mt={4} flex flexDirection='column' className='gap-2'>
          {jobPostingData.map((job) => (
            <JobPostingCardItem key={job.documentId} job={job} />
          ))}
        </Box>
      )}
    </Page>
  )
}
interface IJobPostingCardItemProps {
  job: IJobPosting
  onUpdateRecruitment?: (job: IJobPostingUpdate) => void
  isShowStatus?: boolean
}

export const JobPostingCardItem: React.FC<IJobPostingCardItemProps> = ({
  job,
  isShowStatus = false,
  onUpdateRecruitment = () => {},
}) => {
  const navigate = useNavigate()

  const handleUpdateRecruitment = (
    e: React.MouseEvent<HTMLElement>,
    job: IJobPosting,
    statusValue: JobPostingStatus,
  ): void => {
    e.stopPropagation()
    onUpdateRecruitment({
      documentId: job.documentId,
      title: job.title,
      description: job.description,
      company: job.company,
      address: job.address,
      phone: job.phone,
      taxCode: job.taxCode,
      postingStatus: statusValue,
    })
  }

  return (
    <Box
      className='!p-4 shadow-sm rounded-md border-[1px]'
      key={job.documentId}
      onClick={() => navigate(`/job-posting/${job.documentId}`)}
    >
      <Text size='large' className='!font-medium text-sky-600 break-words whitespace-normal'>
        {job.title}
      </Text>
      <Text size='small' className='text-gray-600 mt-2 break-words whitespace-normal'>
        {job.company}
      </Text>
      <Box mt={5} flex className='gap-2' justifyContent='space-between'>
        <Box className='!flex gap-1 items-center text-gray-700'>
          <Icon icon='zi-location-solid' size={18} />
          <Text size='xxSmall'>{getCityFromAddress(job.address)}</Text>
        </Box>
        <Box className='!flex gap-1 items-center text-gray-700 '>
          <Icon icon='zi-calendar-solid' size={18} />
          <Text size='xxSmall'>{formatDateDDMMYYYYhhmm(job.createdAt, false)}</Text>
        </Box>
      </Box>
      {isShowStatus && (
        <Box mt={4} flex justifyContent='space-between' alignItems='center'>
          {job.postingStatus === JobPostingStatus.OPEN ? (
            <Button
              className='!bg-red-500 !rounded-md !text-xs !px-3 !py-1 !h-fit'
              onClick={(e) => handleUpdateRecruitment(e, job, JobPostingStatus.CLOSED)}
            >
              Dừng tuyển dụng
            </Button>
          ) : job.postingStatus === JobPostingStatus.CLOSED ? (
            <Button
              className='!bg-blue-500 !rounded-md !text-xs !px-3 !py-1 !h-fit'
              onClick={(e) => handleUpdateRecruitment(e, job, JobPostingStatus.IN_PROGRESS)}
            >
              Yêu cầu tuyển dụng
            </Button>
          ) : null}
          <Text size='xxSmall' className={cn(JOB_STATUS_CONFIG[job.postingStatus].color, 'flex-1 !text-end')}>
            {JOB_STATUS_CONFIG[job.postingStatus].label}
          </Text>
        </Box>
      )}
    </Box>
  )
}

export default ListJobPostingPage
