import { openPhone, openWebview } from 'zmp-sdk'

export const openPageInWebview = async (url): Promise<void> => {
  try {
    await openWebview({
      url: url,
      config: {
        style: 'normal',
      },
    })
  } catch (error) {
    console.log(error)
  }
}

export const openPhoneCall = async (phoneNumber): Promise<void> => {
  try {
    await openPhone({
      phoneNumber,
    })
  } catch (error) {
    console.log(error)
  }
}

interface AppUrls {
  android: string
  ios: string
  desktop: string
}

export const getAppUrl = (appType: 'vneid' | 'vssid'): string => {
  const userAgent = navigator.userAgent || navigator.vendor

  const appUrls: Record<string, AppUrls> = {
    vneid: {
      android: 'https://play.google.com/store/apps/details?id=com.vnid',
      ios: 'https://apps.apple.com/vn/app/vneid/id1582750372',
      desktop: 'https://vneid.gov.vn/',
    },
    vssid: {
      android: 'https://play.google.com/store/apps/details?id=com.bhxhapp',
      ios: 'https://apps.apple.com/vn/app/vssid/id1521647264',
      desktop: 'https://baohiemxahoi.gov.vn/gioithieu/Pages/tai-ung-dung-vssid.aspx',
    },
  }

  const urls = appUrls[appType]

  if (/android/i.test(userAgent)) {
    return urls.android
  } else if (/iPad|iPhone|iPod/.test(userAgent)) {
    return urls.ios
  }

  return urls.desktop
}
