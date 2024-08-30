import dayjs from 'dayjs'

export function subtractDate(days: number) {
  return dayjs().subtract(days, 'day').startOf('day').toDate()
}
