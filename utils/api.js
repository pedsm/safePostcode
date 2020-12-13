import get from 'axios'
import { prevXMonth } from '../utils/date'
const { log, error } = console
const MONTHS_BACK = 6

export async function fetchPoliceRecords(lat, lon) {
  const date = new Date()
  const month = `${date.getUTCFullYear()}-${date.getMonth() + 1}`
  
  try {
    const urls = new Array(MONTHS_BACK).fill(null)
    const resp = await Promise.all(
      urls.map((a,i) => 
        get(`https://data.police.uk/api/crimes-at-location?date=${prevXMonth(month, i + 1)}&lat=${lat}&lng=${lon}`),
      )
    )

    return resp.reduce((a,b) => {
      return [...a, ...b.data]
    }, [])
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