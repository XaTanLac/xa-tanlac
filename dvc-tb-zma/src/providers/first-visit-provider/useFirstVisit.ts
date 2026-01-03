import { useContext } from 'react'

import { FirstVisitContextProps } from './FirstVisitProvider'

export const useFirstVisit = (
  firstVisitContext: React.Context<FirstVisitContextProps | undefined>,
): FirstVisitContextProps => {
  const context = useContext(firstVisitContext)
  if (!context) {
    throw new Error('useFirstVisit must be used inside FirstVisitProvider')
  }
  return context
}
