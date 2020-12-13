import { useState } from 'react'
import { getCrimeData, useCrimeData } from '../utils/hooks'
import Stats from '../components/stats'
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
  const { postcodeData, crimes, loading } = useCrimeData(postcode, props)

  return (
    <>
      <section className="section">
        <div className="container">
          <h1 className="title">👮🏻‍♀Safe postcode</h1>
          <form action="/" method="GET">
            <input
              name="postcode"
              style={{ marginBottom: 10 }}
              className="input"
              placeholder="postcode"
              onChange={e => setPostcode(e.target.value)}
              value={postcode}
            />
          </form>
          <Stats crimes={crimes} postcode={postcode} postcodeData={postcodeData} loading={loading} />
          {crimes.map((crime, i) => (
            <Crime crime={crime} key={i} />
          ))}
        </div>
      </section>
      <footer style={{ boxShadow: "0 100vh 0 100vh #fafafa" }} className="footer">
        <div className="content has-text-centered">
          <a href="https://github.com/pedsm/safePostcode"><strong>Safe Postcode</strong></a>  built by <a href="https://github.com/pedsm">Pedro Mendonca</a> with <a href="https://nextjs.org/">Next.js</a>
        </div>
      </footer>
    </>
  )
}