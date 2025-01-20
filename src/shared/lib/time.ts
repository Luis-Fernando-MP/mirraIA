import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.locale('es')

dayjs.extend(relativeTime)

export const rlvTime = (time: Date) => dayjs(time).fromNow()
