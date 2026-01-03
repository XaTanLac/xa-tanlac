/**
 * Joins multiple class names, filtering out falsy values
 * @param classes - Any number of class names or conditional expressions that evaluate to class names
 * @returns A string of joined class names
 * @example
 * // returns "btn btn-primary active"
 * classNames('btn', 'btn-primary', isActive && 'active', false, null, undefined, '')
 */
export const cn = (...classes: (string | boolean | undefined | null)[]): string => {
  return classes.filter(Boolean).join(' ')
}

/**
 * @param phoneNumber - The phone number string to format
 * @returns A formatted phone number string with spaces every 3 digits
 * @example
 * // returns "0123 456 789"
 * formatPhoneNumber("84123456789")
 * // returns "0987 654 321"
 * formatPhoneNumber("0987654321")
 */
export const formatPhoneNumber = (phoneNumber: string): string => {
  // Remove all non-digit characters
  const cleaned = phoneNumber.replace(/\D/g, '')

  // Handle Vietnamese phone numbers starting with 84
  const formatted = cleaned.startsWith('84') ? '0' + cleaned.slice(2) : cleaned

  // Format with spaces every 3 digits
  return formatted.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3')
}

/**
 * Formats a Date object into a string with the format dd/mm/yyyy hh:mm
 * @param date - The date to format (Date object or ISO string)
 * @returns Formatted date string in dd/mm/yyyy hh:mm format
 */
export const formatDateDDMMYYYYhhmm = (date: Date | string, isTime: boolean = true): string => {
  const d = typeof date === 'string' ? new Date(date) : date

  const day = d.getDate().toString().padStart(2, '0')
  const month = (d.getMonth() + 1).toString().padStart(2, '0')
  const year = d.getFullYear()

  const dateStr = `${day}/${month}/${year}`

  if (!isTime) return dateStr

  const hours = d.getHours().toString().padStart(2, '0')
  const minutes = d.getMinutes().toString().padStart(2, '0')

  return `${dateStr} ${hours}:${minutes}`
}

/**
 * Extracts the city name from an address string
 * @param address - The full address string
 * @returns The city name or empty string if not found
 * @example
 * // returns "Hà Nội"
 * getCityFromAddress("123 Trần Hưng Đạo, Hoàn Kiếm, Hà Nội")
 * // returns "Hồ Chí Minh"
 * getCityFromAddress("456 Nguyễn Huệ, Quận 1, Thành phố Hồ Chí Minh")
 */
export const getCityFromAddress = (address: string): string => {
  if (!address) return ''

  // Split by comma and get the last part (usually the city)
  const parts = address.split(',').map((part) => part.trim())

  if (parts.length === 0) return ''

  const lastPart = parts[parts.length - 1]

  // Remove common prefixes like "Thành phố", "Tỉnh", etc.
  return lastPart.replace(/^(Thành phố|Tỉnh|TP\.?)\s+/i, '').trim()
}

/**
 * Gets the start and end date of a week, month, or day
 * @param date - The reference date (defaults to today)
 * @param type - 'day' for a single day, 'week' for ISO week or 'month' for calendar month
 * @returns Object with start and end dates
 * @example
 * // returns { start: Date(Jan 15 00:00), end: Date(Jan 15 23:59) }
 * getDateRange(new Date('2024-01-15'), 'day')
 * // returns { start: Date(Mon), end: Date(Sun) }
 * getDateRange(new Date('2024-01-15'), 'week')
 * // returns { start: Date(Jan 1), end: Date(Jan 31) }
 * getDateRange(new Date('2024-01-15'), 'month')
 */
export const getDateRange = (
  type: 'day' | 'week' | 'month' = 'day',
  date: Date = new Date(),
): { start: Date; end: Date } => {
  const d = new Date(date)

  if (type === 'day') {
    const start = new Date(d)
    start.setHours(0, 0, 0, 0)

    const end = new Date(d)
    end.setHours(23, 59, 59, 999)

    return { start, end }
  }

  if (type === 'week') {
    const dayOfWeek = d.getDay()
    const diff = d.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1)

    const start = new Date(d.setDate(diff))
    start.setHours(0, 0, 0, 0)

    const end = new Date(start)
    end.setDate(end.getDate() + 6)
    end.setHours(23, 59, 59, 999)

    return { start, end }
  }

  const start = new Date(d.getFullYear(), d.getMonth(), 1)
  start.setHours(0, 0, 0, 0)

  const end = new Date(d.getFullYear(), d.getMonth() + 1, 0)
  end.setHours(23, 59, 59, 999)

  return { start, end }
}
