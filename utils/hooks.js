import { useState, useEffect } from 'react';
import { fetchPostcodeInfo, fetchPoliceRecords } from './api'

export function useCrimeData(postcode, initialValue) {
  const [loading, setLoading] = useState(false)
  const [postcodeData, setPostcodeData] = useState(initialValue.postcodeData || {})
  const [crimes, setCrimes] = useState(initialValue.crimes || [])

  useEffect(() => {
    async function fetchPostcode() {
      setLoading(true)
      const { postcodeData, crimes } = await getCrimeData(postcode)
      setPostcodeData(postcodeData)
      setCrimes(crimes)
      setLoading(false)
    }
    fetchPostcode()
  }, [postcode])

  return { postcodeData, crimes, loading }
}

export async function getCrimeData(postcode) {
  const postcodeData = await fetchPostcodeInfo(postcode)
  if(postcodeData == null) {
    return {
      postcodeData: null,
      crimes: []
    }
  }
  const { latitude, longitude } = postcodeData
  const crimes = await fetchPoliceRecords(latitude, longitude)
  return { postcodeData, crimes }
}