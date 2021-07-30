import { CrimeMonth } from "../utils/api";
import { formatDate } from "../utils/date";
import Crime from './crime'

interface Props {
  crimeMonth: CrimeMonth
}

export default function crimeMonth({ crimeMonth }: Props) {
  return (
    <section className="md:flex items-start">
      <div className="md:w-2/6 sticky top-0 md:top-10 px-8 pt-1 py-4 bg-white backdrop-filter backdrop-blur-lg bg-opacity-30">
        <h2 className="font-bold text-gray-800 text-4xl mt-8 mb-4">{formatDate(crimeMonth.month)}</h2>
        <p className="md:mb-4 text-gray-600"><span className="font-bold">{crimeMonth.crimes.length}</span> crimes have been reported this month.</p>
      </div>
      <div className="md:w-4/6 mx-4 grid md:grid-cols-2 gap-8">
        {crimeMonth.crimes.map((crime, i) => (<Crime crime={crime} key={i} />))}
      </div>
    </section>
  )

}