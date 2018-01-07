import React from 'react'

export default class Alert extends React.Component {
  render () {
    const {show, message, alertClass} = this.props

    const shouldApear = typeof show === 'undefined' ? true : show

    return (
      <div>
        {
          shouldApear &&
                    <div>
                      <div className={alertClass + ' alert text-center col-xs-8 col-xs-offset-2'} role="alert">
                        {message}
                      </div>
                    </div>
        }
      </div>
    )
  }
}
