import React, { useEffect, useState, useCallback } from 'react'
import { useParams } from 'react-router-dom'

import ArticleTemplateDetail from '@/components/article/article-detail'
import { IArticle } from '@/hooks/use-article'
import { useZaloArticleDetail } from '@/hooks/use-zalo-article'
import { IZaloArticleMedia } from '@/types/zalo-oa'

interface ZaloBodyItem {
  type: 'text' | 'image' | 'video'
  content?: string
  url?: string
  caption?: string
}

interface ZaloArticleDetail extends IZaloArticleMedia {
  body?: ZaloBodyItem[]
  cover?: {
    cover_type: string
    photo_url: string
    status: string
  }
  description?: string
}

const NewsArticleDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [data, setData] = useState<IArticle>()
  const token = localStorage.getItem('zalo_oa_access_token') || import.meta.env.VITE_ZALO_ACCESS_TOKEN

  const [articleDetail, loading] = useZaloArticleDetail(id || '', token)

  const mapZaloToArticle = useCallback((article: ZaloArticleDetail): IArticle => {
    const getVideoEmbed = (url: string): string => {
      // YouTube
      const youtubeRegex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/
      const youtubeMatch = url.match(youtubeRegex)
      if (youtubeMatch) {
        const videoId = youtubeMatch[1]
        return `<div style="margin: 16px 0; position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://www.youtube.com/embed/${videoId}" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;" allowFullScreen></iframe></div>`
      }

      // Vimeo
      const vimeoRegex = /vimeo\.com\/(\d+)/
      const vimeoMatch = url.match(vimeoRegex)
      if (vimeoMatch) {
        const videoId = vimeoMatch[1]
        return `<div style="margin: 16px 0; position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"><iframe src="https://player.vimeo.com/video/${videoId}" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;" allowFullScreen></iframe></div>`
      }

      // Facebook
      if (url.includes('facebook.com') || url.includes('fb.watch')) {
        return `<div style="margin: 16px 0;"><iframe src="https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&width=500&show_text=false" width="500" height="281" style="border:none;overflow:hidden;max-width:100%" scrolling="no" frameborder="0" allowFullScreen="true"></iframe></div>`
      }

      // Fallback: treat as direct video URL
      return `<div style="margin: 16px 0;"><video controls style="max-width: 100%; height: auto;"><source src="${url}" type="video/mp4"/></video></div>`
    }

    let createdAtISO = ''
    if (typeof article.create_date === 'number') {
      createdAtISO = new Date(article.create_date).toISOString()
    } else if (typeof article.create_date === 'string') {
      createdAtISO = article.create_date
    }

    let htmlContent = ''
    if (article.body && Array.isArray(article.body)) {
      htmlContent = article.body
        .map((item: ZaloBodyItem) => {
          if (item.type === 'text') {
            return item.content || ''
          }
          if (item.type === 'image' && item.url) {
            const caption = item.caption || ''
            const img = `<img src="${item.url}" alt="${caption}" style="max-width: 100%; height: auto; margin: 16px 0;" />`
            if (caption) {
              return `<figure>${img}<figcaption>${caption}</figcaption></figure>`
            }
            return `<figure>${img}</figure>`
          }
          if (item.type === 'video' && item.url) {
            return getVideoEmbed(item.url)
          }
          return ''
        })
        .join('')
    } else {
      htmlContent = article.thumb || article.cover?.photo_url || ''
    }

    const coverUrl = article.cover?.photo_url || article.thumb
    return {
      documentId: article.id,
      title: article.title,
      content: htmlContent,
      isTopNews: false,
      createdAt: createdAtISO,
      imgBanner: coverUrl
        ? {
            id: 0,
            documentId: article.id,
            name: article.title,
            url: coverUrl,
          }
        : undefined,
      description: article.description,
    }
  }, [])

  useEffect(() => {
    if (!loading && articleDetail) {
      const mappedArticle = mapZaloToArticle(articleDetail as ZaloArticleDetail)
      setData(mappedArticle)
    }
  }, [articleDetail, loading, mapZaloToArticle])

  return <ArticleTemplateDetail data={data} loading={loading} />
}

export default NewsArticleDetailPage
