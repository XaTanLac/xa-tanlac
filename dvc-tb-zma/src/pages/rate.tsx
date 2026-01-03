import React from 'react'
import { Box, Button, Header, Icon, Page } from 'zmp-ui'

import { openPageInWebview } from '@/constants'
import useAssessmentsMemo from '@/hooks/use-assessment'

const RatePage: React.FC = () => {
  const [data, loading] = useAssessmentsMemo({}, [])

  return (
    <Page hideScrollbar className='page bg-white -mt-10'>
      <Header title='Đánh giá sự hài lòng' backgroundColor='#ffffff' />
      <Box flex justifyContent='center' alignContent='center' className='!min-h-screen'>
        <Box flex flexDirection='column' justifyContent='center' className='gap-4 !mx-auto !w-full'>
          {data.map((el) => (
            <Button
              key={el.documentId}
              variant='secondary'
              prefixIcon={<Icon icon='zi-star' />}
              onClick={() => {
                openPageInWebview(el.google_form_link)
              }}
              className='!text-wrap !whitespace-normal !h-fit'
            >
              <div className='text-left'>{el.title}</div>
            </Button>
          ))}
        </Box>
      </Box>
    </Page>
  )
}

export default RatePage
