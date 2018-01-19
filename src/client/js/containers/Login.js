// @flow

import type { Action, Dispatch } from '../actions/types/index'
import type {
  State as DefaultState,
  Store,
  Usuario
} from '../reducers/types/index'

import Alerta from '../components/Alerta'
import FloatInput from '../components/FloatInput'
import { Link } from 'react-router'
import type { LoginType } from '../actions/index'
import RaisedButton from 'material-ui/RaisedButton'
import React from 'react'
import autobind from 'autobind-decorator'
import { connect } from 'react-redux'
import { loginUser } from '../actions/'

type StateProps = {
  user: DefaultState<Usuario>
}

type DispatchProps = {
  loginUser: LoginType => Promise<Action<Usuario>>
}

type Props = StateProps & DispatchProps & {}

type State = { email: string, senha: string }

class Login extends React.Component<Props, State> {
  state = { email: '', senha: '' }

  @autobind
  handleClick(e: SyntheticInputEvent<HTMLButtonElement>) {
    e.preventDefault()
    const { email, senha } = this.state

    const creds: LoginType = { username: email.trim(), password: senha.trim() }

    this.props.loginUser(creds)
  }

  @autobind
  handleChange(event: SyntheticInputEvent<HTMLInputElement>) {
    const { value, name } = event.target

    this.setState({ [name]: value })
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
            <RaisedButton onClick={this.handleClick} label="Login" />
          </div>
          <div className="text-center">
            <Link to="/cadastro/aluno">Ainda não tem conta?</Link>
          </div>
        </form>
      </div>
    )
  }
}

function mapStateToProps(store: Store): StateProps {
  return {
    user: store.usuario
  }
}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
  return {
    loginUser: (creds: LoginType) => dispatch(loginUser(creds))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
