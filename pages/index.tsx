import { GetServerSideProps } from 'next'
import { ReactElement, useState } from 'react'
import { CrimeData, getCrimeData, useCrimeData } from '../utils/hooks'
import Stats from '../components/stats'
import CrimeMonth from '../components/crimeMonth'

export const getServerSideProps:GetServerSideProps = async ({query}) => {
  const postcode = query.postcode as string
  if (postcode) {
    const {postcodeData, crimeMonths} = await getCrimeData(postcode)
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

export default function Index(props:CrimeData): ReactElement {
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
            <CrimeMonth crimeMonth={crimeMonth} key={i} />
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