import React, { useEffect, useMemo, useState } from 'react'
import { Box, Button, Page, Text, useNavigate } from 'zmp-ui'

import recordIcon from '@/assets/icons/record-default.png'
import logoIcon from '@/assets/images/logo.jpg'
import NoDataSection from '@/components/no-data'
import SkeletonCard from '@/components/skeleton-card'
import { MY_POSTING_API } from '@/constants/endpoint'
import { IAudioPosting, MediaModel, useArticleMemo } from '@/hooks/use-article'
import DefaultHeader from '@/layouts/default-header'
import { cn, formatDateDDMMYYYYhhmm } from '@/utils/string-handler'

const AudioPostingPage: React.FC = () => {
  const [listAudio, setListAudio] = useState<IAudioPosting[]>([])
  const [pageNumber, setPageNumber] = useState(1)

  const [data, loading, metaData] = useArticleMemo<IAudioPosting[]>(
    MY_POSTING_API.AUDIO,
    { pagination: { page: pageNumber, pageSize: 10 } },
    [pageNumber],
  )

  const isLoadMore = useMemo(() => {
    return metaData && metaData.pagination && metaData.pagination.page < metaData.pagination.pageCount
  }, [metaData])

  useEffect(() => {
    if (!loading && data) setListAudio((prev) => [...prev, ...data])
  }, [data, loading])

  return (
    <Page hideScrollbar className='page bg-white'>
      <DefaultHeader title='Âm thanh' />
      {loading ? (
        [...Array(12)].map((el, index) => <SkeletonCard key={index} />)
      ) : listAudio.length > 0 ? (
        <Box mt={4} flex flexDirection='column' className='gap-3'>
          {listAudio.map((item) => (
            <AudioCard
              key={item.documentId}
              title={item.title}
              documentId={item.documentId}
              linkVideo={item.linkVideo}
              createdAt={item.createdAt}
              audio={item.audio}
            />
          ))}

          {isLoadMore && (
            <Button size='medium' loading={loading} onClick={() => setPageNumber((prev) => prev + 1)}>
              Tải thêm
            </Button>
          )}
        </Box>
      ) : (
        <NoDataSection />
      )}
    </Page>
  )
}

interface AudioCardProps {
  title: string
  documentId: string
  createdAt: string
  linkVideo?: string
  audio?: MediaModel
}

const AudioCard: React.FC<AudioCardProps> = ({ title, documentId, linkVideo, audio, createdAt }) => {
  const navigate = useNavigate()

  const imageSrc = useMemo(() => {
    if (audio) return recordIcon

    const videoId = linkVideo?.split('/').pop()?.split('?')[0]
    return videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : logoIcon
  }, [audio, linkVideo])

  if (!linkVideo && !audio) {
    return null
  }

  return (
    <Box
      flex
      pr={2}
      className='bg-white border border-gray-300 rounded-lg shadow-sm space-x-2 active:opacity-70'
      onClick={() => navigate(`/my-posting/audio/${documentId}`)}
    >
      <Box
        flex
        justifyContent='center'
        alignItems='center'
        className='!w-24 overflow-hidden rounded-l-lg border-r border-gray-400'
      >
        <img src={imageSrc} alt={title} className={cn(audio ? 'p-3 h-16' : 'h-full', 'rounded-md rounded-r-none')} />
      </Box>
      <Box p={2} flex flexDirection='column' justifyContent='space-between' className='flex-1 gap-2'>
        <Text size='small' className='!font-semibold text-gray-800 line-clamp-2'>
          {title}
        </Text>
        <Box flex className='items-center justify-between'>
          <Text size='xxxSmall' className='text-gray-500'>
            {formatDateDDMMYYYYhhmm(createdAt, false)}
          </Text>
        </Box>
      </Box>
    </Box>
  )
}

export default AudioPostingPage
