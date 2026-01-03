import { useMemo } from 'react'

import { AuthorizedHeader, DOMAIN } from '@/constants'

import useCms, { IUseCmsQuery } from './use-cms'

export interface IPhanAnh {
  id: number
  address: string
  code: string
  description: string
  reply: string
  email: string
  files: any[]
  fullname: string
  phone: string
  type: ITypePhanAnh
  createdAt: string
  updatedAt: string
  documentId: string
  processing_status: 'Đang xử lý' | 'Đã hủy' | 'Hoàn tất'
}

export interface ITypePhanAnh {
  documentId: string
  type: string
  createdAt: string
}

const usePhanAnhMemo: (queryParams: IUseCmsQuery, deps: any[]) => [IPhanAnh[], boolean, any] = (queryParams, deps) => {
  const { data, meta, loading } = useCms(
    {
      options: {
        host: DOMAIN,
        endpoint: '/api/recommendations',
        method: 'GET',
      },
      headers: AuthorizedHeader,
      queryParams: {
        ...queryParams,
        populate: queryParams.populate || '*',
        sort: queryParams.sort || ['createdAt:desc'],
      },
    },
    [...deps],
  )

  const [phananhData, metaData] = useMemo<[IPhanAnh[], any]>(() => {
    return !loading && data ? [data, meta] : [[], null]
  }, [data, loading, meta])

  return [phananhData, loading, metaData]
}

const usePhanAnhDetailMemo: (id: string, queryParams: IUseCmsQuery, deps: any[]) => [IPhanAnh, boolean, any] = (
  id,
  queryParams,
  deps,
) => {
  const { data, loading, meta } = useCms(
    {
      options: {
        host: DOMAIN,
        endpoint: `/api/recommendations/${id}`,
        method: 'GET',
      },
      headers: AuthorizedHeader,
      queryParams,
    },
    [...deps],
  )

  const [phananhData, metaData] = useMemo<[IPhanAnh, any]>(() => {
    return !loading && data ? [data, meta] : [null, null]
  }, [data, loading])

  return [phananhData, loading, metaData]
}

const useTypePhanAnhMemo: (queryParams: IUseCmsQuery, deps: any[]) => [ITypePhanAnh[], boolean, any] = (
  queryParams,
  deps,
) => {
  const { data, meta, loading } = useCms(
    {
      options: {
        host: DOMAIN,
        endpoint: '/api/type-recommendations',
        method: 'GET',
      },
      headers: AuthorizedHeader,
      queryParams: {
        ...queryParams,
        populate: queryParams.populate || '*',
        sort: queryParams.sort || ['createdAt:desc'],
      },
    },
    [...deps],
  )

  const [typePhanAnhData, metaData] = useMemo<[ITypePhanAnh[], any]>(() => {
    return !loading && data ? [data, meta] : [[], null]
  }, [data, loading, meta])

  return [typePhanAnhData, loading, metaData]
}
export { usePhanAnhMemo, usePhanAnhDetailMemo, useTypePhanAnhMemo }
