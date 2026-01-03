import IconCard from '@/components/icon-card'
import DefaultHeader from '@/layouts/default-header'
import React from 'react'
import { Box, Page, useNavigate } from 'zmp-ui'
import jobIcon from '@/assets/icons/job.png'
import jobPostIcon from '@/assets/icons/job-post.png'

const JobPostingPage: React.FC = () => {
  const navigate = useNavigate()
  return (
    <Page className='page' hideScrollbar>
      <DefaultHeader title='Dịch vụ việc làm' />
      <Box flex flexDirection='column' justifyContent='center' alignItems='center' className='!h-screen'>
        <Box flex flexDirection='column' className='gap-5 p-4'>
          <IconCard title='Danh sách tuyển dụng' icon={jobIcon} onClick={() => navigate('/job-posting/list')} />
          <IconCard
            title='Bài tuyển dụng của bạn'
            icon={jobPostIcon}
            onClick={() => navigate('/job-posting/my-list')}
          />
        </Box>
      </Box>
    </Page>
  )
}

export default JobPostingPage
