import { GetServerSideProps } from 'next'
import { ReactElement, useState } from 'react'
import { CrimeData, getCrimeData, useCrimeData } from '../utils/hooks'
import Stats from '../components/stats'
import CrimeMonth from '../components/crimeMonth'

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const postcode = query.postcode as string
  if (postcode) {
    const { postcodeData, crimeMonths } = await getCrimeData(postcode)
    return {
      props: {
        postcode,
        postcodeData,
        crimeMonths,
      }
    }
  }
  return {
    props: { postcode: postcode || '' }
  }
}

export default function Index(props: CrimeData): ReactElement {
  const [postcode, setPostcode] = useState(props.postcode || '')
  const { postcodeData, crimeMonths, loading } = useCrimeData(postcode, props)

  return (
    <section className="section p-0">
      <div className="container mx-auto">
        <div className="px-4">
          <h1 className="font-bold text-4xl mt-8">👮🏻‍♀Safe postcode</h1>
          <form action="/" method="GET">
            <input
              name="postcode"
              className="bg-white shadow-lg border-2 border-gray-200 rounded my-4 py-4 px-8 w-full"
              placeholder="Enter the postcode to check"
              onChange={e => setPostcode(e.target.value)}
              value={postcode}
            />
          </form>
          <Stats crimeMonths={crimeMonths} postcode={postcode} postcodeData={postcodeData} loading={loading} />
        </div>
        {crimeMonths.map((crimeMonth, i) => (
          <CrimeMonth crimeMonth={crimeMonth} key={i} />
        ))}
      </div>
    </section>
  )
}