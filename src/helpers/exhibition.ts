import type { ExhibitionType } from '@/models/exhibition'
import dayjs from 'dayjs'
export function getTypeName(type: ExhibitionType) {
  switch (type) {
    case 'art':
      return 'ศิลปกรรม'
    case 'literature':
      return 'วรรณกรรม'
    case 'media':
      return 'สื่อวิดีโอ'
    default:
      return 'ไม่พบประเภท'
  }
}

export function getBadgeStatus(active: boolean) {
  if (active) {
    return 'badge badge-success'
  } else {
    return 'badge badge-error'
  }
}

export function getFriendlyDate(date: string, format?: string) {
  if (format) {
    return dayjs(date).format(format)
  }
  return dayjs(date).format('DD MMM YYYY')
}
