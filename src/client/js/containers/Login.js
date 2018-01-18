import { connect } from 'react-redux'
import { handleChange } from '../util'
import { loginUser } from '../actions/'
import { Link } from 'react-router'

import React from 'react'

import Alerta from '../components/Alerta'
import FloatInput from '../components/FloatInput'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = { email: '', senha: '' }

    this.handleChange = handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  render() {
    const { hasError, error } = this.props.user
    const { email, senha } = this.state

    return (
      <div>
        <h2 className="text-center">Login</h2>
        <form
          id="login-form"
          className="form-group col-xs-10 col-xs-offset-1 col-sm-4 col-sm-offset-4"
        >
          <div className="input-group">
            <FloatInput
              name="email"
              value={email}
              textLabel="E-mail"
              handleChange={this.handleChange}
              autofocus="true"
            />
          </div>
          <div className="input-group">
            <FloatInput
              name="senha"
              value={senha}
              type="password"
              textLabel="Senha"
              handleChange={this.handleChange}
            />
          </div>
          {hasError && (
            <Alerta alertClass="alert-danger" message={error.message} />
          )}
          <div className="input-group text-center">
            <button onClick={this.handleClick} className="btn btn-primary">
              Login
            </button>
          </div>
          <div className="text-center">
            <Link to="/cadastro/aluno">Ainda não tem conta?</Link>
          </div>
        </form>
      </div>
    )
  }

  handleClick(e) {
    e.preventDefault()
    const { dispatch } = this.props
    const { email, senha } = this.state

    const creds = { username: email.trim(), password: senha.trim() }

    dispatch(loginUser(creds))
  }
}

function mapStateToProps(state) {
  return {
    user: state.usuario
  }
}

export default connect(mapStateToProps)(Login)
