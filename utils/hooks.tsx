import { useState, useEffect } from 'react';
import { fetchPostcodeInfo, fetchPoliceRecords, CrimeMonth, Postcode } from './api'

export interface CrimeData {
  postcode: string|null
  postcodeData: Postcode
  crimeMonths: CrimeMonth[]
  loading: boolean
}

export function useCrimeData(postcode:string, initialValue:CrimeData):CrimeData {
  const [loading, setLoading] = useState(false)
  const [postcodeData, setPostcodeData] = useState<Postcode>(initialValue.postcodeData || null)
  const [crimeMonths, setCrimes] = useState<CrimeMonth[]>(initialValue.crimeMonths || [])

  useEffect(() => {
    async function fetchPostcode() {
      setLoading(true)
      const { postcodeData, crimeMonths } = await getCrimeData(postcode)
      if(postcodeData) {
        setPostcodeData(postcodeData)
      }
      setCrimes(crimeMonths)
      setLoading(false)
    }
    fetchPostcode()
  }, [postcode])

  return { postcodeData, crimeMonths, loading, postcode }
}

export async function getCrimeData(postcode:string): Promise<{postcodeData: Postcode|null; crimeMonths: CrimeMonth[];}> {
  const postcodeData = await fetchPostcodeInfo(postcode)
  if(postcodeData == null) {
    return {
      postcodeData: null,
      crimeMonths: []
    }
  }
  const { latitude, longitude } = postcodeData
  const crimeMonths = await fetchPoliceRecords(latitude, longitude)
  return { postcodeData, crimeMonths }
}