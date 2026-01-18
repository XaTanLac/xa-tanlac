import React from 'react'
import { Box, Icon, Page, Spinner, Text } from 'zmp-ui'

import DefaultHeader from '@/layouts/default-header'
import { formatDateDDMMYYYYhhmm } from '@/utils/string-handler'
import { IArticle } from '@/hooks/use-article'

interface ZaloBodyItem {
  type: 'text' | 'image' | 'video'
  content?: string
  url?: string
  caption?: string
}

interface ArticleTemplateDetailProps {
  data?: IArticle
  loading?: boolean
}

const ArticleTemplateDetail: React.FC<ArticleTemplateDetailProps> = ({ data, loading }): React.ReactElement => {
  const renderContent = (): React.ReactNode => {
    if (!data?.content && !data?.body) return null

    if (data.body && Array.isArray(data.body)) {
      return (
        <>
          {data.body.map((item: ZaloBodyItem, idx: number) => {
            if (item.type === 'text' && item.content) {
              return (
                <div
                  key={idx}
                  className='prose max-w-none text-gray-800'
                  dangerouslySetInnerHTML={{ __html: item.content }}
                />
              )
            }
            if (item.type === 'image' && item.url) {
              const caption = item.caption || ''
              return (
                <figure key={idx} className='my-4'>
                  <img src={item.url} alt={caption} className='max-w-full h-auto' />
                  {caption && <figcaption className='text-center mt-2 text-gray-600 text-sm'>{caption}</figcaption>}
                </figure>
              )
            }
            if (item.type === 'video' && item.url) {
              return (
                <div key={idx} className='my-4 w-full'>
                  <video controls className='max-w-full h-auto block bg-black'>
                    <source src={item.url} type='video/mp4' />
                    <track kind='captions' src='' label='Captions' />
                    Trình duyệt của bạn không hỗ trợ video
                  </video>
                </div>
              )
            }
            return null
          })}
        </>
      )
    }

    return <div className='prose max-w-none text-gray-800' dangerouslySetInnerHTML={{ __html: data.content }} />
  }

  return (
    <Page className='bg-white' hideScrollbar>
      <DefaultHeader title={data?.title || ''} />
      {loading ? (
        <Box flex justifyContent='center' alignItems='center' className='h-screen'>
          <Spinner />
        </Box>
      ) : (
        <Box>
          {data?.imgBanner && (
            <Box>
              <img className='object-cover h-64 w-screen' src={data.imgBanner.url || ''} alt='Article banner' />
            </Box>
          )}
          <Box px={4} className='!mt-7'>
            <Text className='!text-xl !font-semibold uppercase'>{data?.title || ''}</Text>
            <Box className='!my-2'>
              <Box className='!flex gap-1 items-center text-gray-700'>
                <Icon icon='zi-calendar' size={18} />
                <Text className='!text-sm'>{formatDateDDMMYYYYhhmm(data?.createdAt || new Date())}</Text>
              </Box>
            </Box>
            {data?.description && (
              <Box className='!my-3'>
                <Text className='!font-semibold text-gray-800'>{data.description}</Text>
              </Box>
            )}
          </Box>
          <Box px={4} mt={4} className='article-content !pb-10'>
            {renderContent()}
          </Box>
        </Box>
      )}
    </Page>
  )
}

export default ArticleTemplateDetail
