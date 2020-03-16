import React from 'react'

export default class Crime extends React.Component {
  cleanDashCase(dashCase) {
    const s = dashCase.split('-').join(' ')
    return s[0].toUpperCase() + s.slice(1)
  }

  render() {
    const { crime } = this.props
    return (
      <article className="media">
        <div className="media-content">
          <div className="content">
            <p><strong>{this.cleanDashCase(crime.category)}</strong></p>
            <p>{crime.location.street.name} <br />
              {crime.outcome_status == null ? "🔎 No outcome avaliable" : "🧐" + crime.outcome_status.category}
            </p>
          </div>
        </div>
      </article>
    )
  }
}