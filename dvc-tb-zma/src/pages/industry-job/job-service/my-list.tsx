import React, { useState } from 'react'
import { useRecoilState } from 'recoil'
import { Box, Icon, Page, Sheet, useNavigate, useSnackbar } from 'zmp-ui'

import CustomTabs, { ITab } from '@/components/custom-tabs/custom-tabs'
import MovingButton from '@/components/moving-button'
import NoDataSection from '@/components/no-data'
import SkeletonCard from '@/components/skeleton-card'
import { AuthorizedHeader, DOMAIN } from '@/constants'
import { IJobPostingUpdate, JobPostingStatus, useJobPostingMemo } from '@/hooks/use-job-posting'
import DefaultHeader from '@/layouts/default-header'
import { userState } from '@/state'

import { JobPostingCardItem } from './list'

const MyJobPostingListPage: React.FC = () => {
  const navigate = useNavigate()
  const { openSnackbar } = useSnackbar()
  const [userInfo] = useRecoilState(userState)

  const [triggerUpdate, setTriggerUpdate] = useState(0)
  const [isSheetVisible, setIsSheetVisible] = useState(false)
  const [JobPostingSelected, setJobPostingSelected] = useState<IJobPostingUpdate | null>(null)
  const [currentTab, setCurrentTab] = useState<number | string>('all')
  const [jobPostingData, isLoadingPost] = useJobPostingMemo(
    {
      filters: {
        phone: {
          $eq: userInfo?.phoneNumber || '',
        },
        postingStatus:
          currentTab === 'all'
            ? {}
            : {
                $in: [currentTab],
              },
      },
    },
    [userInfo?.phoneNumber, currentTab, triggerUpdate],
  )

  const statusTabs: ITab[] = [
    { id: 'all', label: 'Tất cả' },
    ...Object.values(JobPostingStatus).map((status) => ({
      id: status,
      label: status,
    })),
  ]

  const validationIdJobPosting = (): boolean => {
    if (!JobPostingSelected) {
      openSnackbar({
        text: 'Bài đăng không hợp lệ, vui lòng thử lại sau!',
        type: 'error',
      })
      return false
    }
    return true
  }

  const handleUpdateRecruitment = async (): Promise<void> => {
    if (!validationIdJobPosting()) return
    try {
      const { documentId, ...rest } = JobPostingSelected!
      const res = await fetch(`${DOMAIN}/api/jobs/${documentId}`, {
        method: 'PUT',
        headers: AuthorizedHeader,
        body: JSON.stringify({ data: { ...rest } }),
      })

      if (!res.ok) {
        throw new Error('Failed to stop recruitment')
      }

      setIsSheetVisible(false)
      openSnackbar({
        text: 'Dừng tuyển dụng thành công!',
        type: 'success',
      })
      setTriggerUpdate((prev) => prev + 1)
      setJobPostingSelected(null)
    } catch (error) {
      console.error('Error stopping recruitment:', error)
    }
  }

  const handleOpenSheet = async (job: IJobPostingUpdate): Promise<void> => {
    setIsSheetVisible(true)
    setJobPostingSelected(job)
  }

  return (
    <Page className='bg-white' hideScrollbar>
      <DefaultHeader title='Bài tuyển dụng của bạn' />
      <Box mt={4}>
        <CustomTabs
          scrollable
          items={statusTabs}
          onTabClick={(tab) => {
            setCurrentTab(tab)
          }}
          pageContent={
            isLoadingPost ? (
              [...Array(12)].map((_, index) => <SkeletonCard key={index} />)
            ) : jobPostingData.length === 0 ? (
              <NoDataSection />
            ) : (
              <Box mt={2} flex flexDirection='column' className='gap-2 !px-4'>
                {jobPostingData.map((job) => (
                  <JobPostingCardItem
                    key={job.documentId}
                    job={job}
                    isShowStatus
                    onUpdateRecruitment={handleOpenSheet}
                  />
                ))}
              </Box>
            )
          }
        />
      </Box>
      <Box className='absolute bottom-20 right-10 z-10'>
        <MovingButton onClick={() => navigate('/job-posting/form')}>
          <Icon icon='zi-plus' className='text-white !font-black' />
        </MovingButton>
      </Box>
      <Sheet.Actions
        actions={[
          [
            {
              close: true,
              danger: true,
              text: 'Đồng ý',
              onClick: handleUpdateRecruitment,
            },
          ],
          [
            {
              close: true,
              text: 'Hủy',
            },
          ],
        ]}
        mask
        swipeToClose
        title='Bạn muốn dừng tuyển dụng vị trí này?'
        visible={isSheetVisible}
        onClose={() => setIsSheetVisible(false)}
      />
    </Page>
  )
}

export default MyJobPostingListPage
