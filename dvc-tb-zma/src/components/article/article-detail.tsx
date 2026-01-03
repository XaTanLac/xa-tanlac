import Markdown from 'markdown-to-jsx'
import React from 'react'
import { Box, Icon, Page, Spinner, Text } from 'zmp-ui'
import { openWebview } from 'zmp-sdk'

import DefaultHeader from '@/layouts/default-header'
import { formatDateDDMMYYYYhhmm } from '@/utils/string-handler'
import { IArticle } from '@/hooks/use-article'

interface ArticleTemplateDetailProps {
  data?: IArticle
  loading?: boolean
}

const CustomLink: React.FC<{ href?: string; children: React.ReactNode }> = ({ href, children }) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (href) {
      openWebview({
        url: href,
        config: {
          style: 'normal',
          leftButton: 'back',
        },
      })
    }
  }

  return (
    <a href={href} onClick={handleClick} className='text-blue-600 underline'>
      {children}
    </a>
  )
}

const ArticleTemplateDetail: React.FC<ArticleTemplateDetailProps> = ({ data, loading }) => {
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
              <img className={'object-cover h-64 w-screen'} src={data.imgBanner.url || ''} alt='News banner' />
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
          </Box>
          <Box px={4} mt={10} className='article-content !pb-1'>
            <Markdown
              options={{
                overrides: {
                  a: {
                    component: CustomLink,
                  },
                },
              }}
            >
              {data?.content || ''}
            </Markdown>
          </Box>
        </Box>
      )}
    </Page>
  )
}

export default ArticleTemplateDetail
