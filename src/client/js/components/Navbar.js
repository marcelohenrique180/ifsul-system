// @flow

import type {
  State as DefaultState,
  Store,
  Usuario
} from '../reducers/types/index'
import React, { Component } from 'react'

import type { Dispatch } from '../actions/types/index'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { indexRoute } from '../util'
import { logoutUser } from '../actions/index'

type StateProps = {
  usuario: DefaultState<Usuario>
}

type DispatchProps = { logoutUser: () => any }

type Props = StateProps &
  DispatchProps & {
    isAuthenticated: boolean
  }

class Navbar extends Component<Props> {
  static defaultProps = {
    isAuthenticated: localStorage.getItem('id_token') !== null
  }

  render() {
    const { isAuthenticated } = this.props.isAuthenticated
      ? this.props
      : this.props.usuario.payload

    return (
      <nav className="navbar navbar-inverse">
        <Link to={indexRoute()} className="navbar-brand">
          LOGO
        </Link>

        {isAuthenticated ? (
          <Link
            className="nav-link"
            to="/logout"
            onClick={() => {
              this.props.logoutUser()
            }}
          >
            <img src="img/glyphicons-388-log-out.png" alt="" /> Logout
          </Link>
        ) : (
          <Link className="nav-link" to="/login">
            <img src="img/glyphicons-388-log-out.png" alt="" /> Login
          </Link>
        )}
      </nav>
    )
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
