import React from 'react'
import { Box, Icon, Page, Text } from 'zmp-ui'

import NoDataSection from '@/components/no-data'
import { openPhoneCall } from '@/constants'
import useHotlineMemo, { IHotline } from '@/hooks/use-hotline'
import DefaultHeader from '@/layouts/default-header'

const HotlinePage: React.FC = () => {
  const [hotline, loading] = useHotlineMemo(
    {
      sort: ['sort:asc'],
      populate: {
        listHotlines: {
          sort: ['sort:asc'],
        },
      },
    },
    [],
  )

  return (
    <Page hideScrollbar className='page bg-white'>
      <DefaultHeader title='Đường dây nóng' />
      {loading ? (
        <HotlineSectionSkeleton />
      ) : hotline.length === 0 ? (
        <NoDataSection />
      ) : (
        <Box mt={2}>
          {hotline?.map((section, index) => (
            <HotlineSection
              key={index}
              title={section.name}
              listHotlines={section.listHotlines}
              phoneNumberColor={section.phoneColor}
            />
          ))}
        </Box>
      )}
    </Page>
  )
}
interface PhoneNumberItemProps {
  name: string
  phone: string
  phoneColor?: string
  isLastItem?: boolean
}

const PhoneNumberItem: React.FC<PhoneNumberItemProps> = ({
  name: title,
  phone: phoneNumber,
  phoneColor,
  isLastItem = false,
}) => {
  return (
    <Box
      flex
      justifyContent='space-between'
      alignItems='center'
      py={5}
      className={isLastItem ? '' : 'border-b-[1px] border-gray-200'}
    >
      <Text className='flex-1 pr-2'>{title}</Text>
      <Box
        flex
        alignItems='center'
        justifyContent='flex-end'
        className='w-[130px] flex-shrink-0 gap-1 active:opacity-70'
        onClick={() => openPhoneCall(phoneNumber)}
      >
        <Icon style={{ color: phoneColor || '#cf1c13' }} icon='zi-call-solid' size={24} />
        <Text style={{ color: phoneColor || '#cf1c13' }}>{phoneNumber}</Text>
      </Box>
    </Box>
  )
}

interface HotlineSectionProps {
  title: string
  listHotlines: IHotline[]
  phoneNumberColor?: string
}

const HotlineSection: React.FC<HotlineSectionProps> = ({ title, listHotlines: listPhoneNumbers, phoneNumberColor }) => {
  return (
    <Box mt={5} mb={2}>
      <Text size='xLarge' className='!font-bold text-green-500'>
        {title}
      </Text>
      {listPhoneNumbers.map((item, index) => (
        <PhoneNumberItem
          key={index}
          name={item.name}
          phone={item.phone}
          phoneColor={phoneNumberColor}
          isLastItem={index === listPhoneNumbers.length - 1}
        />
      ))}
    </Box>
  )
}

const HotlineSectionSkeleton: React.FC = () => {
  return (
    <Box p={4} mt={10} className='border-b'>
      <Box>
        <div className='mb-5 !text-transparent bg-gray-200 !w-20 !h-9 animate-pulse !rounded-lg' />
      </Box>
      <Box flex alignItems='center' justifyContent='space-between' py={2}>
        <Box flex alignItems='center' className='gap-4'>
          <div className='!text-transparent bg-gray-200 !w-40 !h-9 animate-pulse !rounded-lg' />
        </Box>
        <Box className='!rounded-lg !bg-gray-200 !w-20 !h-9 animate-pulse' />
      </Box>
    </Box>
  )
}

export default HotlinePage
