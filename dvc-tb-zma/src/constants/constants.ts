export const showNavigationOn: string[] = ['/', '/settings', '/profile']

export enum FilterTime {
  TODAY,
  MONTHLY,
  WEEKLY,
}

export const labelFilterTime: Record<FilterTime, string> = {
  [FilterTime.TODAY]: 'Hôm nay',
  [FilterTime.WEEKLY]: 'Tuần này',
  [FilterTime.MONTHLY]: 'Tháng này',
}
