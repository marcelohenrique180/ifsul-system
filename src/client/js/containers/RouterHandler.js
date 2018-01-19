// @flow

import * as React from 'react'

type Props = { children: React$Node }

export default class RouterHandler extends React.Component<Props> {
  render() {
    const { children } = this.props

    if (!children) {
      return null
    }
    return children
  }
}
