export interface IIndustry {
  documentId: string
  name: string
  description: string
  address: string
  phone: string
  email: string
  taxCode: string
  infoStatus: string
  createdAt: string
}

export enum IndustryStatus {
  IN_PROGRESS = 'Đang xử lý',
  ACCEPTED = 'Đã duyệt',
  CANCELLED = 'Bị từ chối',
}
