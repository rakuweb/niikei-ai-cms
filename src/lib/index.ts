import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import 'dayjs/locale/ja';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale('ja');

export function formatDate(dateString: string): string {
  {
    const result = dayjs(dateString)
      .tz('Asia/Tokyo')
      .format('YYYY/MM/DD HH:mm');

    return result;
  }
}
