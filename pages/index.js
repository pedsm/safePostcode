import { useState } from 'react'
import { getCrimeData, useCrimeData } from '../utils/hooks'
import Stats from '../components/stats'
import { formatDate } from '../utils/date'
import Crime from '../components/crime'

export async function getServerSideProps({query}) {
  const { postcode } = query
  if (postcode) {
    const {postcodeData, crimes} = await getCrimeData(postcode)
    return {
      props: {
        postcode,
        postcodeData,
        crimes,
      }
    }
  }
  return {
    props: { postcode: postcode || '' }
  }
}

export default function Index(props) {
  const [postcode, setPostcode] = useState(props.postcode || '')
  const { postcodeData, crimeMonths, loading } = useCrimeData(postcode, props)

  return (
    <>
      <section className="section p-0">
        <div className="container mx-auto">
          <h1 className="font-bold text-4xl mt-8">👮🏻‍♀Safe postcode</h1>
          <form action="/" method="GET">
            <input
              name="postcode"
              className="bg-white shadow-md rounded my-4 py-4 px-8 w-full"
              placeholder="Enter the postcode to check"
              onChange={e => setPostcode(e.target.value)}
              value={postcode}
            />
          </form>
          <Stats crimeMonths={crimeMonths} postcode={postcode} postcodeData={postcodeData} loading={loading}/>
          {crimeMonths.map((crimeMonth, i) => (
            <section className="md:flex items-start">
              <div className="md:w-2/6 sticky top-0 md:top-10 px-8 pt-1 py-4 bg-white backdrop-filter backdrop-blur-lg bg-opacity-30">
                <h2 className="font-bold text-gray-800 text-4xl mt-8 mb-4">{formatDate(crimeMonth.month)}</h2>
                <p className="md:mb-4 text-gray-600"><span className="font-bold">{crimeMonth.crimes.length}</span> crimes have been reported this month.</p>
              </div>
              <div className="md:w-4/6 mx-4 grid md:grid-cols-2 gap-8" key={i}>
                {crimeMonth.crimes.map((crime, i) => (<Crime crime={crime} key={i}/>))}
              </div>
            </section>
          ))}
        </div>
      </section>
      <footer className="w-full text-white text-center mt-8 mx-auto bg-gray-700 p-12">
        <div className="content has-text-centered">
          <a href="https://github.com/pedsm/safePostcode"><strong>Safe Postcode</strong></a>  built by <a href="https://github.com/pedsm">Pedro Mendonca</a> with <a href="https://nextjs.org/">Next.js</a>
        </div>
      </footer>
    </>
  )
}