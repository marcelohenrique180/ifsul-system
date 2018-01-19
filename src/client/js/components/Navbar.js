// @flow

import React, { Component } from 'react'

import type { Dispatch } from '../actions/types/index'
import { Link } from 'react-router'
import type { Store } from '../reducers/types/index'
import { connect } from 'react-redux'
import { indexRoute } from '../util'
import { logoutUser } from '../actions/index'

type StateProps = { isAuthenticated: boolean }

type DispatchProps = { logoutUser: () => any }

type Props = StateProps & DispatchProps

class Navbar extends Component<Props> {
  render() {
    const { isAuthenticated } = this.props

    return (
      <nav className="navbar navbar-inverse">
        <div className="container-fluid">
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle collapsed"
              data-toggle="collapse"
              data-target="#bs-example-navbar-collapse-1"
              aria-expanded="false"
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>
            <Link to={indexRoute()} className="navbar-brand">
              LOGO
            </Link>
          </div>

          <div
            className="collapse navbar-collapse"
            id="bs-example-navbar-collapse-1"
          >
            <ul className="nav navbar-nav navbar-right">
              <li>
                <a className="nav-link" href="#">
                  <img src="img/config.png" width="21" height="18" /> Perfil
                </a>
              </li>
              <li>
                {isAuthenticated ? (
                  <Link
                    className="nav-link"
                    to="/login"
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
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

function mapStateToProps(state: Store): StateProps {
  return {
    isAuthenticated: state.usuario.payload.isAuthenticated
  }
}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
  return {
    logoutUser: () => dispatch(logoutUser())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
