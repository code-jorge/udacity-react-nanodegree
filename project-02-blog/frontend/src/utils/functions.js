export function summary(string) {
  let text = string || ''
  return text.length > 60 ? `${text.substr(0, 59)}...` : text
}

export function timestampPretty(timestamp) {
  let date = new Date(timestamp)

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'
  ]

  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
  const month = date.getMonth()
  const year = date.getFullYear()
  const hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
  const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()

  return `${hour}:${minutes} - ${day} ${months[month]} ${year}`
}
