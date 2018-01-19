// @flow

import * as React from 'react'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Navbar from './Navbar'

export default class App extends React.Component<{ children: React$Node }> {
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Navbar />
          <div className="container-fluid">
            <div className="row">{this.props.children}</div>
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}
