export default function Stats({ crimes, postcode, postcodeData, loading }) {
  return (
    <nav className="level">
      <p className="level-item has-text-centered">
        {(() => {
          if (loading) {
            return 'Loading data...'
          } else if (crimes.length == 0 && postcode == '') {
            return 'Please enter your postcode'
          } else if (postcodeData == null) {
            return (<span><strong>{postcode.toUpperCase()}</strong> is not a valid postcode</span>)
          }
          return (<span><strong>{crimes.length}</strong>&nbsp;records found for <strong>{postcodeData.postcode}</strong></span>)
        })()}
      </p>
    </nav>
  )
}