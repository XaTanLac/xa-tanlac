import { useMemo } from 'react'

import { AuthorizedHeader, DOMAIN } from '@/constants'

import useCms, { IUseCmsQuery } from './use-cms'

export interface IHotlineType {
  id: number
  name: string
  phoneColor: string
  listHotlines: IHotline[]
}

export interface IHotline {
  id: number
  name: string
  phone: string
}

const useHotlineMemo: (queryParams: IUseCmsQuery, deps: any[]) => [IHotlineType[], boolean] = (
  queryParams: IUseCmsQuery,
  deps: [],
) => {
  const { data, loading } = useCms(
    {
      options: {
        host: DOMAIN,
        endpoint: '/api/hotline-types',
        method: 'GET',
      },
      headers: AuthorizedHeader,
      queryParams: {
        ...queryParams,
        populate: queryParams.populate || '*',
      },
    },
    [...deps],
  )

  const hotlineData = useMemo<IHotlineType[]>(() => {
    return !loading && data ? data : []
  }, [data, loading])

  return [hotlineData, loading]
}

export default useHotlineMemo
