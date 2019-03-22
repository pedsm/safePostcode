import React from 'react'
import Crime from '../components/crime'
import Stats from '../components/stats'
import get from 'axios'

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
        log(postcode)
        this.setState((state) => ({
            ...state,
            postcode
        }))
        const postcodeDetails = await this.fetchPostcodeInfo(postcode)
        if (postcodeDetails == null) {
            log("Postcode doesn't exist")
            this.setState((state) => ({
                ...state,
                crimes: []
            }))
            return
        } else {
            const { latitude, longitude } = postcodeDetails
            this.fetchPoliceRecords(latitude, longitude)
        }

    }

    async fetchPoliceRecords(lat, lon) {
        try {
            const resp = await get(`https://data.police.uk/api/crimes-at-location?lat=${lat}&lng=${lon}`)
            this.setState((state) => ({
                ...state,
                crimes: resp.data
            }))
            return resp.data
        } catch (e) {
            error(e)
            return []
        }
    }

    async fetchPostcodeInfo(postcode) {
        try {
            const resp = await get(`http://api.postcodes.io/postcodes/${postcode}`)
            log(resp)
            return resp.data.result
        } catch (e) {
            error(e)
            return null
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