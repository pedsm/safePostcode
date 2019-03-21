import React from 'react'
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
        if(postcodeDetails == null) {
            log("Postcode doesn't exist") 
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
        } catch(e) {
            error(e)
            return []
        }
    }
    
    async fetchPostcodeInfo(postcode) {
        try {
            const resp = await get(`http://api.postcodes.io/postcodes/${postcode}`)
            log(resp)
            return resp.data.result
        } catch(e){
            error(e)
            return null
        }
    }

    render() {
        return (
            <div>
                <h1>Safe postcode</h1>
                <input onChange={ this.handleInput.bind(this) }  placeholder="postcode" />
                {this.state.crimes.map((crime, i) => (
                    <div key={i}>
                        <p>{crime.category}</p>
                    </div>
                ))}
            </div>
        )
    }
}
  
export default Home