// @flow

import * as React from 'react'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Paper from 'material-ui/Paper'
import { Snackbar } from 'material-ui'
import autobind from 'autobind-decorator'
import { muiTheme } from '../components/App'

const styles = {
  fontFamily: 'Roboto, sans-serif',
  position: 'absolute',
  transform: 'translate(-50%, -50%)',
  top: '50%',
  left: '50%',
  textAlign: 'center',
  height: 500,
  maxWidth: 400,
  marginTop: 20,
  padding: '1em 2em'
}

type State = {
  snackbar: { open: boolean, message: string }
}

type Props = { children: any }

class PlainPaper extends React.Component<Props, State> {
  state = {
    snackbar: { open: false, message: '' }
  }

  @autobind
  toggleSnackBar(message: string) {
    this.setState({
      snackbar: { open: !this.state.snackbar.open, message: message }
    })
  }

  render() {
    const children =
      this.props.children !== null
        ? React.cloneElement(this.props.children, {
            toggleSnackBar: this.toggleSnackBar
          })
        : this.props.children

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <Paper style={styles} zDepth={3}>
            {children}
          </Paper>
          <Snackbar
            open={this.state.snackbar.open}
            message={this.state.snackbar.message}
            autoHideDuration={4000}
            onRequestClose={this.toggleSnackBar}
            style={{ width: 300 }}
          />
        </div>
      </MuiThemeProvider>
    )
  }
}

export default PlainPaper
