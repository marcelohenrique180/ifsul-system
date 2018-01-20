// @flow

import type { Action, Dispatch } from '../actions/types/index'
import type {
  State as DefaultState,
  Store,
  Usuario
} from '../reducers/types/index'

import { Link } from 'react-router'
import type { LoginType } from '../actions/index'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import React from 'react'
import TextField from 'material-ui/TextField'
import autobind from 'autobind-decorator'
import { connect } from 'react-redux'
import { loginUser } from '../actions/'
import { muiTheme } from '../components/App'

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
  gridTemplateRows: '.5fr 2fr auto 1fr'
}

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
      <MuiThemeProvider muiTheme={muiTheme}>
        <Paper style={styles} zDepth={5}>
          <form id="login-form" style={styleLogin}>
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
            <RaisedButton
              secondary={true}
              onClick={this.handleClick}
              label="Login"
            />
          </form>
          <Link to="/cadastro/aluno">Ainda não tem conta?</Link>
        </Paper>
      </MuiThemeProvider>
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
