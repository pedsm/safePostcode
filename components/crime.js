function cleanDashCase(dashCase) {
  const s = dashCase.split('-').join(' ')
  return s[0].toUpperCase() + s.slice(1)
}

const months = ["January",
 "February", "March", "April",
  "May", "June", "July",
  "August", "September", "October", 
  "November", "December"];

const formatDate = (dateStr) => {
  const [year, month] = dateStr.split('-')
  return `${months[parseInt(month)]} ${year}`
}

export default function Crime({ crime }) {
  return (
    <article className="media">
      <div className="media-content">
        <div className="content">
          <div className="level">
            <div className="level-left">
              <p><strong>{cleanDashCase(crime.category)}</strong></p>
            </div>
            <div className="level-rifth">
              <p>{formatDate(crime.month)}</p>
            </div>
          </div>
          <p>{crime.location.street.name}</p>
          <h6>Outcome:</h6>
          {crime.outcome_status == null
            ? (<p>🔎 No outcome available</p>)
            : (
              <p>
                🧐 {crime.outcome_status.category} <br />
                <strong>{formatDate(crime.outcome_status.date)}</strong>
              </p>
            )
          }
          <p>
          </p>
        </div>
      </div>
    </article>
  )
}