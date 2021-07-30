export function prevMonth(dateStr:string):string {
  const date = new Date(dateStr)
  const [month, year] = [date.getMonth() + 1, date.getFullYear()]

  const newMonth = month - 1
  if(newMonth == 0) {
    return `${year-1}-12`
  }

  return `${year}-${leftPad2with0(newMonth)}`
}

export function prevXMonth(dateStr:string, n:number):string {
  if(n == 0) {
    return dateStr
  }
  return prevXMonth(prevMonth(dateStr), n-1)

}

function leftPad2with0(num:number):string {
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

export function formatDate(dateStr:string):string {
  const [year, month] = dateStr.split('-')
  return `${months[parseInt(month)]} ${year}`
}