import { useEffect, useState, ReactElement } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { handleZaloCallback } from '@/utils/zalo-oauth'
import React from 'react'

/**
 * Page: Zalo OAuth Callback
 * URL: /zalo-callback
 * Zalo sẽ redirect đến đây sau khi user cấp quyền
 */
export const ZaloCallbackPage = (): ReactElement => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('Đang xử lý...')

  useEffect(() => {
    const processCallback = async (): Promise<void> => {
      try {
        const code = searchParams.get('code')
        const state = searchParams.get('state')
        const error = searchParams.get('error')
        const errorDescription = searchParams.get('error_description')

        if (error) {
          setStatus('error')
          setMessage(`Lỗi: ${error} - ${errorDescription}`)
          console.error('[Zalo] Permission denied:', error, errorDescription)
          return
        }

        if (!code) {
          setStatus('error')
          setMessage('Không nhận được authorization code')
          return
        }

        console.log('[Zalo] Received code:', code, 'state:', state)

        // Exchange code for tokens via your backend
        const result = await handleZaloCallback(code, state || '', '/api/zalo/token')

        if (result) {
          setStatus('success')
          setMessage('✅ Cấp quyền thành công! Đang chuyển hướng...')

          // Redirect to article list after 2 seconds
          setTimeout(() => {
            navigate('/article-news')
          }, 2000)
        } else {
          setStatus('error')
          setMessage('❌ Không thể lấy access token')
        }
      } catch (err) {
        setStatus('error')
        setMessage(`❌ Lỗi: ${err instanceof Error ? err.message : 'Unknown error'}`)
        console.error('[Zalo] Callback error:', err)
      }
    }

    processCallback()
  }, [searchParams, navigate])

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div className='bg-white p-8 rounded-lg shadow-lg text-center'>
        {status === 'loading' && (
          <>
            <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4' />
            <p className='text-gray-600'>{message}</p>
          </>
        )}

        {status === 'success' && (
          <>
            <div className='text-4xl mb-4'>✅</div>
            <p className='text-green-600 font-semibold'>{message}</p>
          </>
        )}

        {status === 'error' && (
          <>
            <div className='text-4xl mb-4'>❌</div>
            <p className='text-red-600 font-semibold'>{message}</p>
            <button
              onClick={() => window.history.back()}
              className='mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700'
            >
              Quay lại
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default ZaloCallbackPage
