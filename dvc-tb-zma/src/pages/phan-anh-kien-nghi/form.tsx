import React, { useEffect, useMemo, useState } from 'react'
import { useRecoilState } from 'recoil'
import { getUserID, openMediaPicker } from 'zmp-sdk'
import {
  Box,
  Button,
  Icon,
  ImageViewer,
  Input,
  Page,
  Select,
  Sheet,
  Text,
  useLocation,
  useNavigate,
  useSnackbar,
} from 'zmp-ui'

import { AuthorizedHeader, DOMAIN } from '@/constants'
import { useTypePhanAnhMemo } from '@/hooks/use-phan-anh'
import useUserInfo from '@/hooks/use-user-info'
import DefaultHeader from '@/layouts/default-header'
import { userState } from '@/state'

interface ISelectOption {
  title: string
  value: string
}

const FormPage: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { openSnackbar } = useSnackbar()

  const [isSheetVisible, setIsSheetVisible] = useState(false)

  const [fileUploads, setFileUploads] = useState<any[]>([])
  const [imageViewer, setImageViewer] = useState<boolean>(false)
  const [listTypePhanAnh, setListTypePhanAnh] = useState<ISelectOption[]>([])

  const [fullname, setFullname] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [typePhanAnh, setTypePhanAnh] = useState<string>('')
  const [description, setDescription] = useState('')

  const [userInfo, setUserInfo] = useRecoilState(userState)
  const { userInfo: user, isLoading, refetch: refetchGetUserInfo } = useUserInfo({ autoFetch: false })
  const [typePhanAnhData, isLoadingType] = useTypePhanAnhMemo({}, [])

  const validationForm = (): boolean => {
    if (
      fullname.trim() === '' ||
      phoneNumber.trim() === '' ||
      address.trim() === '' ||
      description.trim() === '' ||
      typePhanAnh?.trim() === ''
    ) {
      openSnackbar({
        text: 'Vui lòng điền đầy đủ thông tin',
        type: 'error',
      })
      return false
    }
    return true
  }

  const submitForm = async (): Promise<void> => {
    if (!validationForm()) return

    try {
      // Get user ID once at the beginning
      const zaloId = await getUserID()

      // Create recommendation
      const createResponse = await fetch(`${DOMAIN}/api/recommendations`, {
        method: 'POST',
        headers: AuthorizedHeader,
        body: JSON.stringify({
          data: {
            fullname,
            phone: phoneNumber,
            address,
            ...(email && { email }),
            description,
            files: fileUploads.map((file) => file.id),
            zalo_id: zaloId,
            type: { connect: [typePhanAnh] }, // Include type in initial creation
          },
        }),
      })

      if (!createResponse.ok) {
        throw new Error(`Failed to create recommendation: ${createResponse.status} ${createResponse.statusText}`)
      }

      const { data } = await createResponse.json()

      // Reset form state
      setAddress('')
      setEmail('')
      setDescription('')
      setFileUploads([])
      setTypePhanAnh('')

      // Navigate to success page
      navigate('/phan-anh-kien-nghi/success', {
        state: { data },
        replace: true,
      })
    } catch (error) {
      console.error('Error submitting form:', error)
      openSnackbar({
        text: 'Đã có lỗi xảy ra, vui lòng thử lại sau',
        type: 'error',
      })
    }
  }

  const imageRegex = useMemo(() => /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i, [])
  const uploadedImages = useMemo(
    () => fileUploads.filter((el) => imageRegex.test(el.ext) === true),
    [fileUploads, imageRegex],
  )
  const uploadedFiles = useMemo(
    () => fileUploads.filter((el) => imageRegex.test(el.ext) === false),
    [fileUploads, imageRegex],
  )

  const handleNavigate = (url: string): void => {
    navigate(url, {
      state: {
        data: { typePhanAnh, address, email, description, fileUploads, from: '/phan-anh-kien-nghi/form' },
      },
      replace: true,
    })
  }

  useEffect(() => {
    const addressParam = location.state?.data.address
    const emailParam = location.state?.data.email
    const typePhanAnhParam = location.state?.data.typePhanAnh
    const descriptionParam = location.state?.data.description
    const fileUploadsParam = location.state?.data.fileUploads || []

    // Set other fields if they exist
    if (addressParam) setAddress(addressParam)
    if (emailParam) setEmail(emailParam)
    if (descriptionParam) setDescription(descriptionParam)
    if (typePhanAnhParam) setTypePhanAnh(typePhanAnhParam)
    if (fileUploadsParam) setFileUploads(fileUploadsParam)
  }, [])

  useEffect(() => {
    if (userInfo?.name) {
      setFullname(userInfo.name)
    }
    if (userInfo?.phoneNumber) {
      setPhoneNumber(userInfo.phoneNumber)
    }
  }, [userInfo])

  useEffect(() => {
    if (user && !isLoading) {
      setUserInfo(user)
    }
  }, [user, isLoading, setUserInfo])

  useEffect(() => {
    if (!userInfo) {
      refetchGetUserInfo()
    }
  }, [userInfo, refetchGetUserInfo])

  useEffect(() => {
    if (typePhanAnhData && !isLoadingType) {
      const options = typePhanAnhData.map((item) => ({
        title: item.type,
        value: item.documentId,
      }))
      setListTypePhanAnh(options)
    }
  }, [typePhanAnhData, isLoadingType])

  return (
    <Page hideScrollbar className='page bg-white'>
      <DefaultHeader title='Đơn phản ánh kiến nghị' onBackClick={() => setIsSheetVisible(true)} />
      <Box py={4} mb={5} mt={5} flex flexDirection='column' className='gap-1'>
        <Text className='uppercase text-center text-green-600' bold>
          <div className='text-2xl'>Tiếp nhận phản ánh</div>
        </Text>
        <Text className='text-center text-green-600' size='xxSmall' bold>
          Phản ánh của bạn sẽ được cơ quan có thẩm quyền tiếp nhận để trả lời. Xin vui lòng gõ tiếng việt có dấu
        </Text>
      </Box>
      <Box flex flexDirection='column' className='gap-3'>
        <Input
          label={
            <Text size='large' bold>
              Họ và tên người phản ánh (<b className='text-red-500'>*</b>)
            </Text>
          }
          required
          clearable
          placeholder='Nhập họ và tên'
          onChange={(event) => setFullname(event.target.value)}
          value={fullname}
        />
        <Input
          label={
            <Text size='large' bold>
              Số điện thoại liên hệ (<b className='text-red-500'>*</b>)
            </Text>
          }
          required
          clearable
          placeholder='Nhập số điện thoại'
          type='number'
          onChange={(event) => setPhoneNumber(event.target.value)}
          value={phoneNumber}
        />
        <Input
          label={
            <Text size='large' bold>
              Email
            </Text>
          }
          clearable
          placeholder='Nhập email (nếu có)'
          onChange={(event) => setEmail(event.target.value)}
          value={email}
        />
        <Input
          label={
            <Text size='large' bold>
              Địa chỉ liên hệ (<b className='text-red-500'>*</b>)
            </Text>
          }
          suffix={
            <Box className='!pr-2'>
              <Icon icon='zi-location-solid' />
            </Box>
          }
          placeholder='Số nhà, thôn xóm,...'
          value={address}
          onChange={(event) => setAddress(event.target.value)}
        />
        {!isLoadingType && (
          <Select
            label={
              <Text size='large' bold>
                Loại phản ánh (<b className='text-red-500'>*</b>)
              </Text>
            }
            placeholder='Chọn loại phản ánh'
            onChange={(value) => setTypePhanAnh(value + '')}
            value={typePhanAnh}
          >
            {listTypePhanAnh.map((item) => (
              <Select.Option key={item.value} title={item.title} value={item.value} />
            ))}
          </Select>
        )}
        <Input.TextArea
          label={
            <Text size='large' bold>
              Mô tả (<b className='text-red-500'>*</b>)
            </Text>
          }
          placeholder='Nhập mô tả phản ánh - kiến nghị'
          onChange={(event) => setDescription(event.target.value)}
          value={description}
        />
        <ImageViewer
          visible={imageViewer}
          onClose={() => setImageViewer(false)}
          images={uploadedImages.map((file) => ({
            src: file.url,
            alt: file.name,
            key: file.documentId,
          }))}
        />
        <Box flex flexDirection='column' className='gap-3' mt={1}>
          <Text bold>Tài liệu, hình ảnh đính kèm</Text>
          <Box className='border'>
            {uploadedImages.length > 0 && (
              <Box
                px={3}
                py={2}
                m={2}
                className='border rounded-full bg-slate-100 !space-x-2'
                flex
                alignItems='center'
                onClick={() => {
                  setImageViewer(true)
                }}
              >
                <Icon icon='zi-gallery' />
                <span>{uploadedImages.length} hình ảnh được tải lên</span>
              </Box>
            )}
            {uploadedFiles.map((file) => (
              <Box
                key={file.documentId}
                px={3}
                py={2}
                m={2}
                className='border rounded-full bg-slate-100 !space-x-2'
                flex
                alignItems='center'
              >
                <Icon icon='zi-link' />
                <span>{file.name}</span>
              </Box>
            ))}
            {fileUploads.length === 0 && <Text className='text-center py-4'>Chưa có file nào được tải lên</Text>}
          </Box>
          <Box flex className='gap-4'>
            <Button
              className='w-full !bg-slate-100 !text-gray-800 !rounded-none !border'
              variant='tertiary'
              suffixIcon={<Icon icon='zi-arrow-up' />}
              onClick={() =>
                openMediaPicker({
                  type: 'photo',
                  serverUploadUrl: `${DOMAIN}/api/mediafiles?id=uploads&first_level=phan-anh-kien-nghi`,
                  maxSelectItem: 15,
                  success: (res) => {
                    const data = JSON.parse(res.data)
                    setFileUploads(data.data)
                  },
                  fail: (error) => {
                    console.error(error)
                  },
                })
              }
            >
              Tải file lên
            </Button>
            <Button
              className='w-full !bg-slate-100 !text-gray-800 !rounded-none !border'
              variant='tertiary'
              suffixIcon={<Icon icon='zi-camera' />}
              onClick={() => handleNavigate('/phan-anh-kien-nghi/form/camera')}
            >
              Chụp ảnh
            </Button>
          </Box>
        </Box>
        <Box mt={8} flex className='gap-2'>
          <Button
            className='w-full'
            variant='secondary'
            onClick={() => {
              setIsSheetVisible(true)
            }}
          >
            Hủy bỏ
          </Button>
          <Button className='w-full' onClick={() => submitForm()}>
            Gửi phản ánh
          </Button>
        </Box>
        <Sheet.Actions
          actions={[
            [
              {
                close: true,
                danger: true,
                text: 'Tiếp tục trở về',
                onClick: () => navigate(-1),
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
          title='Thông tin của bạn đã nhập sẽ bị mất. Bạn có chắc chắn muốn tiếp tục?'
          visible={isSheetVisible}
          onClose={() => setIsSheetVisible(false)}
        />
      </Box>
    </Page>
  )
}

export default FormPage
