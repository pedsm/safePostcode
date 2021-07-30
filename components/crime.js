import { formatDate } from '../utils/date'

function cleanDashCase(dashCase) {
  const s = dashCase.split('-').join(' ')
  return s[0].toUpperCase() + s.slice(1)
}

export default function Crime({ crime }) {
  console.log(crime)
  return (
    <article className="p-8 shadow-lg rounded-lg text-gray-700 overflow-hidden">
      <div>
        <div>
          <div>
            <h2 className="font-bold text-xl">{cleanDashCase(crime.category)}</h2>
            <p className="text-base">{formatDate(crime.month)}</p>
          </div>
          <p>{crime.location.street.name}</p>
          <h3 className="text-xl font-bold mt-2">Outcome:</h3>
          <p>{crime.outcome_status?.date}</p>
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