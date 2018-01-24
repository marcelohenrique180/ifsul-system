// @flow

import * as React from 'react'

import {
  green400,
  green500,
  green700,
  lightBlue100,
  lightBlue500,
  lightGreenA200
} from 'material-ui/styles/colors'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Navbar from './Navbar'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

export const muiTheme = getMuiTheme({
  palette: {
    primary1Color: green500,
    primary2Color: green700,
    primary3Color: green400,
    accent1Color: lightGreenA200,
    accent2Color: lightBlue100,
    accent3Color: lightBlue500
  }
})

export default class App extends React.Component<{ children: React$Node }> {
  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div style={{ marginBottom: 56 }}>
          <Navbar />
          {this.props.children}
        </div>
      </MuiThemeProvider>
    )
  }
}
