import { useMemo } from 'react'

import { AuthorizedHeader, DOMAIN } from '@/constants'

import useCms, { IUseCmsQuery } from './use-cms'

export interface IJobPosting {
  id: string
  documentId: number
  title: string
  description: string
  company: string
  address: string
  phone: string
  taxCode: string
  postingStatus: string
  createdAt: string
}

export enum JobPostingStatus {
  OPEN = 'Đang ứng tuyển',
  CLOSED = 'Dừng ứng tuyển',
  IN_PROGRESS = 'Đang xử lý',
  CANCELLED = 'Bị từ chối',
}

export interface IStatus<T> {
  value: T
  label: string
  color: string
}

export interface IJobPostingUpdate extends Omit<IJobPosting, 'createdAt' | 'id'> {}

export const JOB_STATUS_CONFIG: Record<JobPostingStatus, Omit<IStatus<JobPostingStatus>, 'value'>> = {
  [JobPostingStatus.OPEN]: {
    label: 'Đang ứng tuyển',
    color: 'text-green-600',
  },
  [JobPostingStatus.CLOSED]: {
    label: 'Dừng ứng tuyển',
    color: 'text-red-600',
  },
  [JobPostingStatus.IN_PROGRESS]: {
    label: 'Đang xử lý',
    color: 'text-yellow-600',
  },
  [JobPostingStatus.CANCELLED]: {
    label: 'Bị từ chối',
    color: 'text-gray-600',
  },
}

const useJobPostingMemo: (queryParams: IUseCmsQuery, deps: any[]) => [IJobPosting[], boolean] = (queryParams, deps) => {
  const { data, loading } = useCms(
    {
      options: {
        host: DOMAIN,
        endpoint: '/api/jobs',
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

  const postsData = useMemo<IJobPosting[]>(() => {
    return !loading && data ? data : []
  }, [data, loading])

  return [postsData, loading]
}

const useJobPostingDetailMemo: (
  id: string,
  queryParams: IUseCmsQuery,
  deps: any[],
) => [IJobPosting | undefined, boolean] = (id, queryParams, deps) => {
  const { data, loading } = useCms(
    {
      options: {
        host: DOMAIN,
        endpoint: `/api/jobs/${id}`,
        method: 'GET',
      },
      headers: AuthorizedHeader,
      queryParams: {
        ...queryParams,
        populate: '*',
      },
    },
    [id, ...deps],
  )

  const postingData = useMemo<IJobPosting | undefined>(() => {
    return !loading && data ? data : undefined
  }, [data, loading])

  return [postingData, loading]
}

export { useJobPostingMemo, useJobPostingDetailMemo }
