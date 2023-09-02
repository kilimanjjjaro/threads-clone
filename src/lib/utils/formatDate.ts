import dayjs from 'dayjs'

export default function formatDate(timestamp: number) {
  const date = dayjs.unix(timestamp).format()

  const previousDate = dayjs(date)

  const currentDate = dayjs()

  const difference = currentDate.diff(previousDate, 'second')

  function getDifference(difference: number) {
    const justNow = 5
    const secondsInAMinute = 60
    const secondsInAnHour = 3600
    const secondsInADay = 86400
    const secondsInAWeek = 604800
    const secondsInAMonth = 2592000

    if (difference <= justNow) {
      return 'Just now'
    } else if (difference < secondsInAMinute) {
      return `${difference}s`
    } else if (difference < secondsInAnHour) {
      const minutes = Math.floor(difference / secondsInAMinute)
      return `${minutes}m`
    } else if (difference < secondsInADay) {
      const hours = Math.floor(difference / secondsInAnHour)
      return `${hours}h`
    } else if (difference < secondsInAWeek) {
      const days = Math.floor(difference / secondsInADay)
      return `${days}d`
    } else if (difference < secondsInAMonth) {
      const weeks = Math.floor(difference / secondsInAWeek)
      return `${weeks}w`
    }
  }

  const formattedDifference = getDifference(difference)

  return formattedDifference
}
