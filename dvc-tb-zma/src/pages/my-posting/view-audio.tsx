import React, { useCallback, useEffect, useState } from 'react'
import { Box, Page, Spinner, useParams } from 'zmp-ui'

import { IAudioPosting, useMyAudioPostingDetailMemo } from '@/hooks/use-my-posting'
import DefaultHeader from '@/layouts/default-header'

const ViewAudioPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()

  const [audioData, setAudioData] = useState<IAudioPosting>()
  const [audio, loading] = useMyAudioPostingDetailMemo(id || '', {}, [])

  useEffect(() => {
    if (!loading && audio) {
      setAudioData(audio)
    }
  }, [audio, loading])

  const getAudioUrlExt = useCallback((originalUrl: string, ext: string): string => {
    if (!originalUrl || !ext) return originalUrl || ''

    const lastSlashIndex = originalUrl.lastIndexOf('/')
    if (lastSlashIndex === -1) return originalUrl

    const basePath = originalUrl.substring(0, lastSlashIndex + 1)
    const filename = originalUrl.substring(lastSlashIndex + 1)
    const nameWithoutExt = filename.split('.')[0]

    return `${basePath}${encodeURIComponent(`${nameWithoutExt}${ext}`)}`
  }, [])

  return (
    <Page hideScrollbar className='page bg-white'>
      <DefaultHeader title={audioData?.title || ''} />
      {loading ? (
        <Box flex justifyContent='center' alignItems='center' className='h-screen'>
          <Spinner />
        </Box>
      ) : (
        <Box mt={4}>
          {audioData?.audio ? (
            <Box className='!w-full'>
              <audio className='block w-full' controls>
                <source src={getAudioUrlExt(audioData.audio.url, audioData.audio?.ext || '')} type='audio/mp3' />
                <track kind='captions' srcLang='vi' label='Vietnamese' />
                Your browser does not support the audio element.
              </audio>
            </Box>
          ) : (
            <iframe
              className='w-full h-80'
              src={`https://www.youtube.com/embed/${audioData?.linkVideo?.split('/').pop()?.split('?')[0]}`}
              title='YouTube video player'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
              referrerPolicy='strict-origin-when-cross-origin'
              allowFullScreen
            ></iframe>
          )}
        </Box>
      )}
    </Page>
  )
}

export default ViewAudioPage
