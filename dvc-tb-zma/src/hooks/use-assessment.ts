import { useMemo } from 'react'

import { AuthorizedHeader, DOMAIN } from '@/constants'
import useCms, { IUseCmsQuery } from './use-cms'

export interface IAssessment {
  id: number
  title: string
  google_form_link: string
  documentId: string
}

const useAssessmentsMemo: (queryParams: IUseCmsQuery, deps: any[]) => [IAssessment[], boolean, any] = (
  queryParams,
  deps,
) => {
  const { data, loading, meta } = useCms(
    {
      options: {
        host: DOMAIN,
        endpoint: '/api/assessment-forms',
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

  const [assessmentData, metaData] = useMemo<[IAssessment[], any]>(() => {
    return !loading && data ? [data, meta] : [[], null]
  }, [data, loading])

  return [assessmentData, loading, metaData]
}

export default useAssessmentsMemo
