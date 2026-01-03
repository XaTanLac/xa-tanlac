import React, { useEffect, useState } from 'react'
import { downloadFile } from 'zmp-sdk'
import { Box, Icon, Page, Spinner, useParams, useSnackbar } from 'zmp-ui'

import MovingButton from '@/components/moving-button'
import { IImagePosting, useMyImagePostingDetailMemo } from '@/hooks/use-my-posting'
import DefaultHeader from '@/layouts/default-header'

const ViewImagePage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const { openSnackbar } = useSnackbar()

  const [imageData, setImageData] = useState<IImagePosting | null>(null)
  const [image, loading] = useMyImagePostingDetailMemo(id || '', {}, [])

  const handleDownload = async (): Promise<void> => {
    if (!imageData) return

    try {
      await downloadFile({
        url: imageData.img.url,
        onProgress: (progress) => {
          openSnackbar({
            text: `Đang tải xuống: ${Math.round(progress)}%`,
            type: 'loading',
          })
        },
      })
      openSnackbar({
        text: `Tải xuống thành công ${imageData.img.name}`,
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
    if (!loading && image) {
      setImageData(image)
    }
  }, [image, loading])

  return (
    <Page hideScrollbar className='bg-white'>
      <DefaultHeader title={imageData?.title || ''} />
      {loading ? (
        <Box flex justifyContent='center' alignItems='center' className='h-screen'>
          <Spinner />
        </Box>
      ) : (
        <Box mt={4}>
          <Box className='!h-screen !w-full !flex items-center justify-center'>
            <img className='w-screen h-auto' src={imageData?.img.url} alt='Hình ảnh' />
          </Box>
        </Box>
      )}
      <Box className='absolute bottom-20 right-10 z-10'>
        <MovingButton onClick={handleDownload}>
          <Icon icon='zi-download-solid' className='text-white !font-black' />
        </MovingButton>
      </Box>
    </Page>
  )
}

export default ViewImagePage
