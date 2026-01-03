import Markdown from 'markdown-to-jsx'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { downloadFile } from 'zmp-sdk'
import { Box, Icon, Page, Spinner, Text, useSnackbar } from 'zmp-ui'

import { IPublicInfo, usePublicInfoDetailMemo } from '@/hooks/use-public-info'
import DefaultHeader from '@/layouts/default-header'
import { formatDateDDMMYYYYhhmm } from '@/utils/string-handler'

const PublicInfoDetailPage: React.FC = () => {
  const { openSnackbar } = useSnackbar()
  const { id } = useParams<{ id: string }>()
  const [data, setData] = useState<IPublicInfo>()
  const [publicInfoDetailData, loading] = usePublicInfoDetailMemo(id || '', {}, [])

  const handleClickDownloadFile = async (fileUrl: string, fileName: string): Promise<void> => {
    try {
      await downloadFile({
        url: fileUrl,
        onProgress: (progress) => {
          openSnackbar({
            text: `Đang tải xuống: ${Math.round(progress)}%`,
            type: 'loading',
          })
        },
      })
      openSnackbar({
        text: `Tải xuống thành công ${fileName}`,
        type: 'success',
        duration: 2000,
      })
    } catch (error) {
      openSnackbar({
        text: 'Tải xuống không thành công. Vui lòng thử lại sau.',
        type: 'error',
        duration: 2000,
      })
    }
  }

  useEffect(() => {
    if (!loading && publicInfoDetailData) setData(publicInfoDetailData)
  }, [publicInfoDetailData, loading])

  return (
    <Page className='bg-white' hideScrollbar>
      <DefaultHeader title={data?.title || ''} />
      {loading ? (
        <Box flex justifyContent='center' alignItems='center' className='h-screen'>
          <Spinner />
        </Box>
      ) : (
        <Box>
          <Box px={4} className='!mt-7'>
            <Text className='!text-xl !font-semibold uppercase'>{data?.title || ''}</Text>
            <Box className='!my-2'>
              <Box className='!flex gap-1 items-center text-gray-700'>
                <Icon icon='zi-calendar' size={18} />
                <Text className='!text-sm'>{formatDateDDMMYYYYhhmm(data?.createdAt || new Date())}</Text>
              </Box>
            </Box>
          </Box>
          <Box px={4} className='border-t border-b border-gray-200 !py-5'>
            <Text size='xLarge' className='mb-2 !font-medium'>
              File đính kèm:
            </Text>
            {data?.listFiles.map((file, index) => (
              <ul key={index} className='!mt-2 list-disc !pl-5 '>
                <li>
                  <Text
                    size='large'
                    className='underline text-blue-700'
                    onClick={() => handleClickDownloadFile(file.url, file.name.split('/').pop() || '')}
                  >
                    {file.name.split('/').pop()}
                  </Text>
                </li>
              </ul>
            ))}
          </Box>
          <Box px={4} mt={10} className='article-content !pb-1'>
            <Markdown>{data?.content || ''}</Markdown>
          </Box>
        </Box>
      )}
    </Page>
  )
}

export default PublicInfoDetailPage
