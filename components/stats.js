import { MONTHS_BACK } from "../config"

export default function Stats({ crimeMonths, postcode, postcodeData, loading }) {
  return (
    <nav>
      <p className="text-center mb-4">
        {(() => {
          if (loading) {
            return 'Loading data...'
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