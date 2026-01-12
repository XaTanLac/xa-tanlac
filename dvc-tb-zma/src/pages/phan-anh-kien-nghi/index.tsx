import React from 'react'
import { Box, Button, Icon, Page, Text, useNavigate } from 'zmp-ui'

import DefaultHeader from '@/layouts/default-header'

const PhanAnhPage: React.FC = () => {
  const navigate = useNavigate()

  return (
    <Page className='page bg-white' hideScrollbar>
      <DefaultHeader title='Phản ánh kiến nghị' />
      <Box py={4} mb={5} mt={5} flex flexDirection='column' className='gap-1'>
        <Text className='uppercase text-center text-green-600' bold>
          <div className='text-2xl'>Phản ánh kiến nghị</div>
        </Text>
        <Text className='text-center text-green-600' size='xxxSmall' bold>
          Hệ thống tiếp nhận, trả lời phản ánh, kiến nghị của người dân
        </Text>
      </Box>
      <Box flex flexDirection='column' justifyContent='center' className='gap-4 !w-fit !mx-auto'>
        <Button
          variant='primary'
          prefixIcon={<Icon icon='zi-search' />}
          onClick={() => {
            navigate('/phan-anh-kien-nghi/search')
          }}
        >
          Tra cứu phản ánh kiến nghị
        </Button>
        <Button
          variant='primary'
          prefixIcon={<Icon icon='zi-note' />}
          onClick={() => {
            navigate('/phan-anh-kien-nghi/form')
          }}
        >
          Gửi phản ánh kiến nghị
        </Button>
      </Box>
      <Box flex flexDirection='column' className='bg-white w-full border rounded' mt={10}>
        <Text size='xLarge' bold className='bg-gray-200 px-3 py-1.5 text-gray-800'>
          Lưu ý
        </Text>
        <Box px={3} py={3}>
          <Text size='xLarge' bold className='text-gray-800 mb-3'>
            1. Hệ thống tiếp nhận các phản ánh, kiến nghị về:
          </Text>
          <Box className='space-y-3'>
            <Box flex>
              <li className='text-gray-700' />
              <span>
                Hành vi chậm trễ, gây phiền hà hoặc không thực hiện, thực hiện không đúng quy định của cán bộ, công
                chức, viên chức trong giải quyết thủ tục hành chính;
              </span>
            </Box>
            <Box flex>
              <li className='text-gray-700' />
              <span>
                Những cơ chế, chính sách, thủ tục hành chính không phù hợp với thực tế, không đồng bộ, không thống nhất,
                không hợp pháp, trái với các điều ước quốc tế mà Việt Nam đã ký kết hoặc gia nhập;
              </span>
            </Box>
            <Box flex>
              <li className='text-gray-700' />
              <span>
                Những giải pháp, sáng kiến ban hành mới quy định về cơ chế, chính sách, thủ tục hành chính liên quan đến
                hoạt động sản xuất, kinh doanh và đời sống của người dân;
              </span>
            </Box>
            <Box flex>
              <li className='text-gray-700' />
              <span>
                Các trường hợp chậm trễ, không thực hiện, thực hiện không đúng Nghị quyết 68/NQ-CP và Quyết định
                23/2021/QĐ-TTg
              </span>
            </Box>
          </Box>
          <Text size='xLarge' bold className='text-gray-800 mt-6'>
            2. Hệ thống không tiếp nhận đơn thư khiếu nại, tố cáo và hướng dẫn giải đáp pháp luật.
          </Text>
        </Box>
      </Box>
    </Page>
  )
}

export default PhanAnhPage
