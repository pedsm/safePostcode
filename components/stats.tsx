import { ReactElement } from "react"
import { MONTHS_BACK } from "../config"
import { CrimeMonth, Postcode } from "../utils/api"

interface Props {
  crimeMonths: CrimeMonth[]
  postcode: string,
  postcodeData: Postcode
  loading: boolean
}

export default function Stats({ crimeMonths, postcode, postcodeData, loading }:Props): ReactElement {
  return (
    <nav>
      <p className="text-center mb-4 text-gray-800">
        {(() => {
          if (loading) {
            return 'Loading...'
          } else if (crimeMonths.length == 0 && postcode == '') {
            return 'Please enter your postcode'
          } else if (postcodeData == null) {
            return (<span><strong>{postcode.toUpperCase()}</strong> is not a valid postcode</span>)
          }
          return (<span><strong>{crimeMonths?.reduce((a,b) => a + b.crimes.length, 0)}</strong>&nbsp;records found for <strong>{postcodeData.postcode}</strong> in the past {MONTHS_BACK} months</span>)
        })()}
      </p>
    </nav>
  )
}