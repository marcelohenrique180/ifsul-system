// @flow

import * as React from 'react'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Paper from 'material-ui/Paper'
import { muiTheme } from '../components/App'

const styles = {
  fontFamily: 'Roboto, sans-serif',
  position: 'absolute',
  transform: 'translate(-50%)',
  left: '50%',
  textAlign: 'center',
  height: 500,
  maxWidth: 400,
  marginTop: 20,
  padding: '1em 2em',
  display: 'grid',
  gridTemplateRows: '1fr 3em'
}

class PlainPaper extends React.Component<{ children: React$Node }> {
  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <Paper style={styles} zDepth={5}>
          {this.props.children}
        </Paper>
      </MuiThemeProvider>
    )
  }
}

export default PlainPaper
