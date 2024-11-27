export function convertTime(date: string | null) {
  if (!date) {
    return '';
  }
  const dateObj = new Date(date);
  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  const timePeriod = dateObj.getHours() > 12 ? '오후' : '오전';

  return `${timePeriod} ${
    hours > 12
      ? (hours - 12).toString().padStart(2, '0')
      : hours.toString().padStart(2, '0')
  }:${minutes.toString().padStart(2, '0')} `;
}
