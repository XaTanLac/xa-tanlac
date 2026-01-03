import { atom } from 'recoil'

import { IUserInfo } from './hooks/use-user-info'

export const userState = atom<IUserInfo | null>({
  key: 'userState',
  default: null,
})
