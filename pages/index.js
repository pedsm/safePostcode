import React, { Fragment } from 'react'
import Crime from '../components/crime'
import Stats from '../components/stats'
import { fetchPostcodeInfo, fetchPoliceRecords } from '../utils/api'

const { log, error } = console

class Home extends React.Component {
  constructor(props) {
    super(props)
    const { postcode, crimes } = props
    this.state = {
      postcode,
      crimes
    }
  }

  static async getInitialProps({ query }) {
    const postcode = query.postcode || ""
    const postcodeDetails = await fetchPostcodeInfo(postcode)
    if (postcodeDetails == null) {
      return { postcode, crimes: [] }
    }
    const { latitude, longitude } = postcodeDetails
    const crimes = await fetchPoliceRecords(latitude, longitude)
    return {
      postcode,
      crimes
    }
  }

  async handleInput(e) {
    const postcode = e.target.value
    this.setState((state) => ({ ...state, postcode }))
    const postcodeDetails = await fetchPostcodeInfo(postcode)
    if (postcodeDetails == null) {
      this.setState((state) => ({ ...state, crimes: [] }))
      return
    } else {
      const { latitude, longitude } = postcodeDetails
      const crimes = await fetchPoliceRecords(latitude, longitude)
      this.setState((state) => ({ ...state, crimes }))
    }
  }

  render() {
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
                onChange={this.handleInput.bind(this)}
                placeholder="postcode"
                value={this.state.postcode}
              />
            </form>
            <Stats crimes={this.state.crimes} postcode={this.state.postcode} />
            {this.state.crimes.map((crime, i) => (
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
}

export default Home