import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import tz from 'dayjs/plugin/timezone'
// 默认dayjs不支持utc转换，所以先把utc加入dayjs里面
dayjs.extend(utc)
dayjs.extend(tz)
const DATA_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'
export function formatUtcString(
  utcString: string,
  format: string = DATA_TIME_FORMAT
) {
  return dayjs.utc(utcString).utcOffset(8).format(format)
}
// 处理时间戳的数据
// export function formatTimestamp(
//   timestamp: number,
//   format: string = DATA_TIME_FORMAT
// ) {
//   // 此处timestamp是毫秒
//   return dayjs(timestamp).format(format)
// }
