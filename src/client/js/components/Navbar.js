// @flow

import * as React from 'react'

import type {
  State as DefaultState,
  Store,
  Usuario
} from '../reducers/types/index'

import AppBar from 'material-ui/AppBar'
import type { Dispatch } from '../actions/types/index'
import FlatButton from 'material-ui/FlatButton'
import autobind from 'autobind-decorator'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { logoutUser } from '../actions/index'

type StateProps = {
  usuario: DefaultState<Usuario>
}

type DispatchProps = { logoutUser: () => any }

type Props = StateProps &
  DispatchProps & {
    isAuthenticated: boolean
  }

class Navbar extends React.Component<Props> {
  static defaultProps = {
    isAuthenticated: localStorage.getItem('id_token') !== null
  }

  @autobind
  handleLogout(event: SyntheticInputEvent<HTMLInputElement>) {
    event.preventDefault()

    this.props.logoutUser()
    browserHistory.push('/login')
  }

  @autobind
  handleLogin(event: SyntheticInputEvent<HTMLInputElement>) {
    event.preventDefault()

    browserHistory.push('/login')
  }

  render() {
    const { isAuthenticated } = this.props.isAuthenticated
      ? this.props
      : this.props.usuario.payload

    const rightButton = isAuthenticated ? (
      <FlatButton label="Logout" onClick={this.handleLogout} />
    ) : (
      <FlatButton label="Login" onClick={this.handleLogin} />
    )

    return <AppBar showMenuIconButton={false} iconElementRight={rightButton} />
  }
}

function mapStateToProps(store: Store): StateProps {
  return {
    usuario: store.usuario
  }
}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
  return {
    logoutUser: () => dispatch(logoutUser())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
