import get from 'axios'
import { MONTHS_BACK } from '../config'
import { prevXMonth } from '../utils/date'
const { log, error } = console

export async function fetchPoliceRecords(lat, lon) {
  const date = new Date()
  const currentMonth = `${date.getUTCFullYear()}-${date.getMonth() + 1}`

  try {
    const urls = new Array(MONTHS_BACK).fill(null)
    const resp = await Promise.all(
      urls.map(async (a, i) => {
          const month = prevXMonth(currentMonth, i + 1)
          const crimes = await get(`https://data.police.uk/api/crimes-at-location?date=${month}&lat=${lat}&lng=${lon}`)
          return {
            month,
            crimes: crimes.data
          }
        }
      )
    )

  return resp
} catch (e) {
  error(e)
  return []
}
}

export async function fetchPostcodeInfo(postcode) {
  try {
    const resp = await get(`https://postcodes.io/postcodes/${postcode}`)
    log('Postcode found')
    return resp.data.result
  } catch (e) {
    return null
  }
}