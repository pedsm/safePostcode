import axios from 'axios'
import { MONTHS_BACK } from '../config'
import { prevXMonth } from './date'
const { log, error } = console

export interface Crime {
    category:         string;
    location_type:    LocationType;
    location:         Location;
    context:          string;
    outcome_status:   OutcomeStatus | null;
    persistent_id:    string;
    id:               number;
    location_subtype: string;
    month:            string;
}

export interface Location {
    latitude:  string;
    street:    Street;
    longitude: string;
}

export interface Street {
    id:   number;
    name: string;
}

export enum LocationType {
    Force = "Force",
}

export interface OutcomeStatus {
    category: string;
    date:     string;
}

export interface CrimeMonth {
  month: string
  crimes: Crime[]
}


export async function fetchPoliceRecords(lat, lon):Promise<CrimeMonth[]> {
  const date = new Date()
  const currentMonth = `${date.getUTCFullYear()}-${date.getMonth() + 1}`

  try {
    const urls = new Array(MONTHS_BACK).fill(null)
    const resp = await Promise.all(
      urls.map(async (a, i) => {
        const month = prevXMonth(currentMonth, i + 1)
        const crimes = await axios.get<Crime[]>(`https://data.police.uk/api/crimes-at-location?date=${month}&lat=${lat}&lng=${lon}`)
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

export interface Postcode {
  postcode: string;
  quality: number;
  eastings: number;
  northings: number;
  country: string;
  nhs_ha: string;
  longitude: number;
  latitude: number;
  european_electoral_region: string;
  primary_care_trust: string;
  region: null;
  lsoa: string;
  msoa: string;
  incode: string;
  outcode: string;
  parliamentary_constituency: string;
  admin_district: string;
  parish: null;
  admin_county: null;
  admin_ward: string;
  ced: null;
  ccg: string;
  nuts: string;
  codes: Codes;
}

export interface Codes {
  admin_district: string;
  admin_county: string;
  admin_ward: string;
  parish: string;
  parliamentary_constituency: string;
  ccg: string;
  ccg_id: string;
  ced: string;
  nuts: string;
  lsoa: string;
  msoa: string;
  lau2: string;
}


export async function fetchPostcodeInfo(postcode):Promise<Postcode> {
  try {
    const resp = await axios.get(`https://postcodes.io/postcodes/${postcode}`)
    log('Postcode found')
    return resp.data.result
  } catch (e) {
    return null
  }
}
