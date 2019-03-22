import React from 'react'
import Crime from '../components/crime'
import Stats from '../components/stats'
import { fetchPostcodeInfo, fetchPoliceRecords } from '../utils/api'

const { log, error } = console

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            postcode: "",
            crimes: []
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
            <section className="section">
                <div className="container">
                    <h1 className="title">👮🏻‍♀Safe postcode</h1>
                    <input style={{ marginBottom: 10 }} className="input" onChange={this.handleInput.bind(this)} placeholder="postcode" />
                    <Stats crimes={this.state.crimes} postcode={this.state.postcode} />
                    {this.state.crimes.map((crime, i) => (
                        <Crime crime={crime} key={i} />
                    ))}
                </div>
            </section>
        )
    }
}

export default Home