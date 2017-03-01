import React, {Component} from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import {logoutUser} from '../actions/index'

class Navbar extends Component {
    render(){
        return (
            <nav className="navbar navbar-inverse">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"  />
                            <span className="icon-bar" />
                            <span className="icon-bar" />
                        </button>
                        <a className="navbar-brand" href="#">LOGO</a>
                    </div>

                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav navbar-right">
                            <li>
                                <a className="nav-link" href="#">
                                    <img src="img/config.png" width="21" height="18"/> Perfil
                                </a>
                            </li>
                            <li>
                                <Link className="nav-link" to="/login"
                                   onClick={ () => { this.props.dispatch(logoutUser())
                                   }} >
                                    <img src="img/glyphicons-388-log-out.png" alt="" /> Logout
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}

function mapStateToProps(state) {
    return {
        isAuthenticated: state.usuario.isAuthenticated,
        dispatch: state.usuario.dispatch
    }
}

export default connect(mapStateToProps)(Navbar)