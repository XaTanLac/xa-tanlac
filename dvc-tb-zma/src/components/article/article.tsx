import React, { useMemo } from 'react'
import { Box, Button, Page } from 'zmp-ui'

import ArticleCard from '@/components/article/article-card'
import SkeletonCard from '@/components/skeleton-card'
import { IArticle, IPublicInfo } from '@/hooks/use-article'
import DefaultHeader from '@/layouts/default-header'

import NoDataSection from '../../components/no-data'

interface ArticleTemplatePageProps {
  title: string
  data: IArticle[] | IPublicInfo[]
  loading?: boolean
  isLoadingMore?: boolean
  metaData?: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
  onClickCard: (id: string) => void
  onLoadMore?: () => void
}

const ArticleTemplatePage: React.FC<ArticleTemplatePageProps> = ({
  title,
  metaData,
  data,
  loading,
  isLoadingMore,
  onClickCard,
  onLoadMore,
}) => {
  const isLoadMore = useMemo(() => {
    return metaData?.pagination ? metaData.pagination.page < metaData.pagination.pageCount : false
  }, [metaData])

  return (
    <Page hideScrollbar className='page bg-white'>
      <DefaultHeader title={title} />
      {loading ? (
        [...Array(12)].map((el, index) => <SkeletonCard key={index} />)
      ) : data.length === 0 ? (
        <NoDataSection />
      ) : (
        <Box mt={4} flex flexDirection='column' className='gap-3'>
          {data.map((newsItem) => (
            <ArticleCard
              key={newsItem.documentId}
              {...newsItem}
              imgBanner={newsItem.imgBanner?.url}
              onClick={() => onClickCard(newsItem.documentId)}
            />
          ))}
          {isLoadMore && (
            <Button size='medium' loading={isLoadingMore} onClick={onLoadMore}>
              Tải thêm
            </Button>
          )}
        </Box>
      )}
    </Page>
  )
}

export default ArticleTemplatePage
