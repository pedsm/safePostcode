
import get from 'axios'
const { log, error } = console

export async function fetchPoliceRecords(lat, lon) {
    try {
        const resp = await get(`https://data.police.uk/api/crimes-at-location?lat=${lat}&lng=${lon}`)
        return resp.data
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