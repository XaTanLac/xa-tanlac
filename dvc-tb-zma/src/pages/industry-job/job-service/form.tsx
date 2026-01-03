import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { Box, Button, Icon, Input, Page, Sheet, Text, useNavigate, useSnackbar } from 'zmp-ui'

import { AuthorizedHeader, DOMAIN } from '@/constants'
import useUserInfo from '@/hooks/use-user-info'
import DefaultHeader from '@/layouts/default-header'
import { userState } from '@/state'

const FormJobPostingPage: React.FC = () => {
  const navigate = useNavigate()

  const { openSnackbar } = useSnackbar()

  const [isSheetVisible, setIsSheetVisible] = useState(false)

  const [isLoading, setIsLoading] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [company, setCompany] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [taxCode, setTaxCode] = useState('')
  const [address, setAddress] = useState('')

  const [userInfo, setUserInfo] = useRecoilState(userState)
  const {
    userInfo: user,
    isLoading: isLoadingUserInfo,
    refetch: refetchGetUserInfo,
  } = useUserInfo({ autoFetch: false })

  const validationForm = (): boolean => {
    if (
      title.trim() === '' ||
      phoneNumber.trim() === '' ||
      address.trim() === '' ||
      description.trim() === '' ||
      company.trim() === ''
    ) {
      openSnackbar({
        text: 'Vui lòng điền đầy đủ thông tin',
        type: 'error',
      })
      return false
    }

    const phoneRegex = /^(\+?84|0)[3|5|7|8|9]([0-9]{8})$|^(\+?[1-9]\d{0,3})[1-9]\d{4,14}$/
    if (!phoneRegex.test(phoneNumber.trim())) {
      openSnackbar({
        text: 'Số điện thoại không hợp lệ',
        type: 'error',
      })
      return false
    }
    return true
  }

  const submitForm = async (): Promise<void> => {
    if (!validationForm()) return
    setIsLoading(true)
    try {
      const res = await fetch(`${DOMAIN}/api/jobs`, {
        method: 'POST',
        headers: AuthorizedHeader,
        body: JSON.stringify({
          data: {
            title: title,
            description: description,
            address: address,
            phone: phoneNumber,
            taxCode: taxCode,
            company: company,
          },
        }),
      })

      if (!res.ok) {
        throw new Error('HTTP error! ' + res.status + ': ' + res.statusText)
      }

      openSnackbar({
        text: 'Gửi bài tuyển dụng thành công, vui lòng chờ phê duyệt',
        type: 'success',
      })
      // Reset form state
      setTitle('')
      setDescription('')
      setCompany('')
      setPhoneNumber(userInfo?.phoneNumber || '')
      setTaxCode('')
      setAddress('')
    } catch (error) {
      console.log('Error submitting form:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (userInfo?.phoneNumber) {
      setPhoneNumber(userInfo.phoneNumber)
    }
  }, [userInfo])

  useEffect(() => {
    if (user && !isLoadingUserInfo) {
      setUserInfo(user)
    }
  }, [user, isLoadingUserInfo, setUserInfo])

  useEffect(() => {
    if (!userInfo) {
      refetchGetUserInfo()
    }
  }, [userInfo, refetchGetUserInfo])

  return (
    <Page hideScrollbar className='page bg-white'>
      <DefaultHeader title='Thêm bài tuyển dụng' onBackClick={() => setIsSheetVisible(true)} />
      <Box py={4} mb={5} flex flexDirection='column' className='gap-1'>
        <Text className='uppercase text-center text-sky-600' bold>
          <div className='text-2xl'>Bài tuyển dụng mới</div>
        </Text>
        <Text className='text-center text-sky-600' size='xxSmall' bold>
          Vui lòng điền đầy đủ thông tin để gửi bài tuyển dụng. Sau khi gửi, bài tuyển dụng sẽ được xem xét và phê
          duyệt.
        </Text>
      </Box>
      <Box flex flexDirection='column' className='gap-3'>
        <Input
          label={
            <Text size='large' bold>
              Số điện thoại (<b className='text-red-500'>*</b>)
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
              Tên doanh nghiệp/Tổ chức (<b className='text-red-500'>*</b>)
            </Text>
          }
          required
          clearable
          placeholder='Nhập tên doanh nghiệp hoặc tổ chức của bạn'
          onChange={(event) => setCompany(event.target.value)}
          value={company}
        />
        <Input
          label={
            <Text size='large' bold>
              Địa chỉ (<b className='text-red-500'>*</b>)
            </Text>
          }
          suffix={
            <Box className='!pr-2'>
              <Icon icon='zi-location-solid' />
            </Box>
          }
          clearable
          placeholder='Số nhà, thôn xóm,...'
          value={address}
          onChange={(event) => setAddress(event.target.value)}
        />
        <Input
          label={
            <Box>
              <Text size='large' bold>
                Mã số thuế
              </Text>
              <Text size='xxSmall' className='text-gray-500'>
                (Mã số thuế sẽ giúp bạn được kiểm duyệt nhanh hơn)
              </Text>
            </Box>
          }
          clearable
          placeholder='Nhập mã số thuế (nếu có)'
          onChange={(event) => setTaxCode(event.target.value)}
          value={taxCode}
        />
        <Input
          label={
            <Text size='large' bold>
              Tiêu đề (<b className='text-red-500'>*</b>)
            </Text>
          }
          clearable
          placeholder='Nhập tiêu đề'
          onChange={(event) => setTitle(event.target.value)}
          value={title}
        />
        <Input.TextArea
          label={
            <Text size='large' bold>
              Mô tả (<b className='text-red-500'>*</b>)
            </Text>
          }
          placeholder='Nhập mô tả'
          onChange={(event) => setDescription(event.target.value)}
          value={description}
        />
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
          <Button className='w-full' loading={isLoading} onClick={() => submitForm()}>
            Gửi bài tuyển dụng
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

export default FormJobPostingPage
