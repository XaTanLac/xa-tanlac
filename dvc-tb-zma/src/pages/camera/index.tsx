import React, { useEffect, useRef, useState } from 'react'
import {
  createCameraContext,
  FacingMode,
  PhotoFormat,
  PhotoFrame,
  PhotoQuality,
  requestCameraPermission,
  ZMACamera,
} from 'zmp-sdk/apis'
import { Box, Icon, Modal, Page, useLocation, useNavigate, useSnackbar } from 'zmp-ui'

import DefaultHeader from '@/layouts/default-header'
import { AuthorizedHeader, DOMAIN } from '@/constants'

const CameraPage: React.FC = () => {
  const { openSnackbar } = useSnackbar()
  const navigate = useNavigate()
  const location = useLocation()
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const cameraRef = useRef<ZMACamera | null>(null)

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
  const [data, setData] = useState<string>()

  const base64ToBlob = (base64Data: string, contentType = 'image/jpeg'): Blob => {
    // Nếu có prefix thì bỏ đi
    const parts = base64Data.split(',')
    const base64 = parts.length > 1 ? parts[1] : parts[0]

    const byteCharacters = atob(base64)
    const byteNumbers = new Array(byteCharacters.length)
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i)
    }
    const byteArray = new Uint8Array(byteNumbers)
    return new Blob([byteArray], { type: contentType })
  }

  const handleTakePhoto = (): void => {
    const result: PhotoFrame = cameraRef.current?.takePhoto({
      quality: PhotoQuality.NORMAL,
      format: PhotoFormat.JPEG,
      minScreenshotHeight: 1000,
    })

    if (result) {
      setData(result.data)
      setIsModalVisible(true)
    } else {
      openSnackbar({
        text: 'Không thể chụp ảnh',
        type: 'error',
      })
    }
  }

  const handleAcceptImage = async (): Promise<void> => {
    if (!data) {
      setIsModalVisible(false)
      return
    }

    try {
      const formData = new FormData()
      const fileName = `photo_${Date.now()}.jpg`
      const blob = base64ToBlob(data, 'image/jpeg')
      formData.append('file', blob, fileName)
      openSnackbar({
        text: 'Đang tải ảnh, vui lòng chờ...',
        type: 'loading',
      })
      const res = await fetch(`${DOMAIN}/api/mediafiles?id=uploads&first_level=phan-anh-kien-nghi`, {
        method: 'POST',
        headers: { ...AuthorizedHeader },
        body: formData,
      })
      if (!res.ok) {
        openSnackbar({
          text: 'Lỗi tải ảnh',
          type: 'error',
        })
      }

      const resImage = await res.json()

      navigate('/phan-anh-kien-nghi/form', {
        state: {
          data: {
            latLng: location.state?.data.latLng,
            typePhanAnh: location.state?.data.typePhanAnh,
            address: location.state?.data.address,
            email: location.state?.data.email,
            description: location.state?.data.description,
            fileUploads: [...(location.state?.data.fileUploads ?? []), ...resImage.data],
          },
        },
        replace: true,
      })
      openSnackbar({
        text: 'Tải ảnh thành công',
        type: 'success',
      })
      setIsModalVisible(false)
    } catch (error) {
      console.error('Failed to upload photo:', error)
    }
  }

  useEffect(() => {
    const initCamera = async (): Promise<void> => {
      try {
        await requestCameraPermission({})

        const videoElement = videoRef.current
        if (!videoElement) {
          openSnackbar({
            text: 'Lỗi',
            type: 'error',
          })
          return
        }

        if (!cameraRef.current) {
          cameraRef.current = createCameraContext({
            videoElement: videoElement,
            mediaConstraints: {
              width: 640,
              height: 580,
              facingMode: FacingMode.BACK,
              audio: false,
            },
          })
        }

        // Start camera
        await cameraRef.current.start()
      } catch (error) {
        openSnackbar({
          text: 'Không có quyền truy cập camera',
          type: 'error',
        })

        navigate('/phan-anh-kien-nghi/form', {
          state: {
            data: {
              latLng: location.state?.data.latLng,
              typePhanAnh: location.state?.data.typePhanAnh,
              address: location.state?.data.address,
              email: location.state?.data.email,
              description: location.state?.data.description,
              fileUploads: location.state?.data.fileUploads,
            },
          },
          replace: true,
        })
      }
    }

    initCamera()

    // Cleanup function
    return () => {
      const videoElement = videoRef.current
      if (videoElement?.srcObject) {
        const stream = videoElement.srcObject as MediaStream
        stream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [])

  return (
    <Page>
      <DefaultHeader title='Camera' />
      <Box>
        <video style={{ width: '100vw', height: '75vh' }} ref={videoRef} muted playsInline />
        <Box className='!flex justify-around items-center !px-10'>
          <Box className='!w-12 !h-12'></Box>
          <Box className='!w-16 !h-16 bg-sky-600 rounded-full active:opacity-70' onClick={handleTakePhoto}></Box>
          <Box
            className='!w-12 !h-12 bg-gray-300 rounded-full !flex justify-center items-center active:opacity-70'
            onClick={async () => await cameraRef.current?.flip()}
          >
            <Icon icon='zi-auto' />
          </Box>
        </Box>
      </Box>
      <Modal
        visible={isModalVisible}
        actionsDivider={false}
        actions={[
          {
            text: 'Hủy',
            close: true,
            onClick: () => {
              setIsModalVisible(false)
            },
          },
          {
            close: true,
            highLight: true,
            style: { color: '#ea580c' },
            text: 'Chọn',
            onClick: handleAcceptImage,
          },
        ]}
        title='Bạn có muốn lấy ảnh này không?'
      >
        <img className='mt-5' src={data} alt='Ảnh Chụp' />
      </Modal>
    </Page>
  )
}

export default CameraPage
