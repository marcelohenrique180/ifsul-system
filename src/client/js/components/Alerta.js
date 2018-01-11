// @flow

import React from 'react'

type Props = {
  show: ?boolean,
  message: ?string,
  alertClass: string
}

export default class Alert extends React.Component<Props> {
  static defaultProps = {
    alertClass: ''
  }

  render() {
    const { show, message, alertClass } = this.props

    const shouldApear: boolean =
      typeof show === 'undefined' || show === null ? true : show

    return (
      <div>
        {shouldApear && (
          <div>
            <div
              className={
                alertClass + ' alert text-center col-xs-8 col-xs-offset-2'
              }
              role="alert"
            >
              {message}
            </div>
          </div>
        )}
      </div>
    )
  }
}
