import { ReactElement } from "react";
import { CrimeMonth } from "../utils/api";
import { formatDate } from "../utils/date";
import Crime from './crime'

interface Props {
  crimeMonth: CrimeMonth
}

const symbolMap = {
  up: "▲",
  down: "▼"
}

function formatToPercent(num:number):string {
  const symbol = num >= 0 ? symbolMap.up : symbolMap.down 
  return `${symbol} ${(num * 100).toFixed(0)}%`
}

export default function crimeMonth({ crimeMonth }: Props): ReactElement {
  return (
    <section className="md:flex items-start">
      <div className="md:w-2/6 sticky top-0 md:top-10 px-8 pt-1 py-4 bg-white backdrop-filter backdrop-blur-lg bg-opacity-30">
        <h2 className="font-bold text-gray-800 text-4xl mt-8 mb-4">{formatDate(crimeMonth.month)}</h2>
        <p className="md:mb-4 text-gray-600"><span className="font-bold">{crimeMonth.crimes.length}</span> crimes have been reported this month.</p>
        {crimeMonth.monthDelta != null && (
          <p className="md:mb-4 text-gray-600">That is a {crimeMonth.monthDelta >= 0 ? 'increase': 'decrease'} of <span className={`font-bold text-${crimeMonth.monthDelta <= 0 ? 'green' : 'red' }-500`}>{formatToPercent(crimeMonth.monthDelta)}</span> since the previous month.</p>
        )}
      </div>
        {crimeMonth.crimes.length === 0 
          ? (
              <div className="md:w-4/6 text-center w-full mx-auto bg-gray-100 rounded-lg">
                <p className="py-12 mx-auto font-bold text-gray-800">No crimes were reported this month.</p>
              </div>
            ) 
          : (
              <div className="md:w-4/6 my-8 mx-4 grid md:grid-cols-2 gap-8">
                {crimeMonth.crimes.map((crime, i) => (<Crime crime={crime} key={i} />))}
              </div>
            )
        }
    </section>
  )

}