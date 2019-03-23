import React, {Fragment} from 'react'

export default class Level extends React.Component {
    render() {
        const { crimes, postcode } = this.props
        return (
            <nav className="level">
                <p className="level-item has-text-centered">
                    {(() => {
                        if (crimes.length == 0 && postcode == '') {
                            return 'Please enter your postcode'
                        } else if (crimes.length == 0) {
                            return (<>No records found for <strong>{postcode.toUpperCase()}</strong></>)
                        }
                        return (<><strong>{crimes.length}</strong> records found for <strong>{postcode.toUpperCase()}</strong></>)
                    })()}
                </p>
            </nav>
        )
    }
}