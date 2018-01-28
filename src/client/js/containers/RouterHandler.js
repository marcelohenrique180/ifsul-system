// @flow

import * as React from 'react'

export default class RouterHandler extends React.Component<any> {
  render() {
    const { children } = this.props

    if (!children) {
      return null
    }
    return children
  }
}
