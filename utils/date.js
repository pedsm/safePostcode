export function prevMonth(dateStr) {
  const date = new Date(dateStr)
  const [month, year] = [date.getMonth() + 1, date.getFullYear()]

  const newMonth = month - 1
  if(newMonth == 0) {
    return `${year-1}-12`
  }

  return `${year}-${leftPad2with0(newMonth)}`
}

export function prevXMonth(dateStr, n) {
  if(n == 0) {
    return dateStr
  }
  return prevXMonth(prevMonth(dateStr), n-1)

}

function leftPad2with0(num) {
  if(num > 9) {
    return `${num}`
  }
  return `0${num}`

}
const months = ["January",
 "February", "March", "April",
  "May", "June", "July",
  "August", "September", "October", 
  "November", "December"];

export function formatDate (dateStr) {
  const [year, month] = dateStr.split('-')
  return `${months[parseInt(month)]} ${year}`
}