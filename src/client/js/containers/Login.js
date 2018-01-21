// @flow

import type { Action, Dispatch } from '../actions/types/index'
import type {
  State as DefaultState,
  Store,
  Usuario
} from '../reducers/types/index'

import { Link } from 'react-router'
import type { LoginType } from '../actions/index'
import RaisedButton from 'material-ui/RaisedButton'
import React from 'react'
import TextField from 'material-ui/TextField'
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

const styleLogin = {
  display: 'grid',
  gridTemplateRows: '1fr 3em',
  height: '100%'
}

const styleLoginBox = {
  display: 'grid',
  gridTemplateRows: '.5fr 2fr auto 1fr'
}

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
      <section style={styleLogin}>
        <form id="login-form" style={styleLoginBox} onSubmit={this.handleClick}>
          <h2>Login</h2>
          <div>
            <TextField
              name="email"
              floatingLabelText="E-mail"
              defaultValue={email}
              onChange={this.handleChange}
              errorText={hasError ? ' ' : ''}
            />
            <TextField
              name="senha"
              defaultValue={senha}
              type="password"
              floatingLabelText="Senha"
              onChange={this.handleChange}
              errorText={hasError ? error.message : ''}
            />
          </div>
          <RaisedButton primary={true} label="Login" type="submit" />
        </form>
        <Link to="/cadastro/aluno">Ainda não tem conta?</Link>
      </section>
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
