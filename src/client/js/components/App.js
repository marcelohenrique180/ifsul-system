// @flow

import Navbar from './Navbar'
import React from 'react'

export default class App extends React.Component<{ children: React$Node }> {
  render() {
    return (
      <div>
        <Navbar />
        <div className="container-fluid">
          <div className="row">{this.props.children}</div>
        </div>
      </div>
    )
  }
}
