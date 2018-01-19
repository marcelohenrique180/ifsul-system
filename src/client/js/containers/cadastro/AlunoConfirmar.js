// @flow

import * as React from 'react'

import type { Action, Dispatch } from '../../actions/types'
import type {
  AlunoUsuario,
  State as DefaultState,
  Store
} from '../../reducers/types'
import { FAILURE_ALUNO_SENHA, sendAlunoSenha } from '../../actions/aluno'

import Alerta from '../../components/Alerta'
import Carregando from '../../components/Carregando'
import FloatInput from '../../components/FloatInput'
import autobind from 'autobind-decorator'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'

type StateProps = {
  usuario: DefaultState<AlunoUsuario>
}

type DispatchProps = {
  sendAlunoSenha: ([string, string]) => Promise<Action<AlunoUsuario>>
}

type Props = StateProps &
  DispatchProps & {
    params: {
      token: string
    }
  }

type State = {
  senha: string,
  confirmaSenha: string,
  formError: {
    senha: boolean,
    message?: string
  }
}

class AlunoCadastro extends React.Component<Props, State> {
  state = {
    senha: '',
    confirmaSenha: '',
    formError: { senha: false, message: '' }
  }

  @autobind
  handleChange(event: SyntheticInputEvent<HTMLButtonElement>) {
    const { name, value } = event.target

    this.setState({ [name]: value })
  }

  @autobind
  handleClickSenha(e: SyntheticEvent<HTMLButtonElement>) {
    e.preventDefault()
    const { senha, confirmaSenha } = this.state
    const token: string = this.props.params['token']

    if (senha !== confirmaSenha) {
      this.setState({
        formError: { senha: true, message: 'Senha diferentes!' }
      })
    } else if (senha === '') {
      this.setState({
        formError: { senha: true, message: 'Senha deve ser informada!' }
      })
    } else if (senha.search(/(?=.*\d)/g)) {
      this.setState({
        formError: {
          senha: true,
          message: 'Senha deve conter pelo menos 1 número'
        }
      })
    } else if (senha.search(/(?=.*[A-Z])/g)) {
      this.setState({
        formError: {
          senha: true,
          message: 'Senha deve conter pelo menos 1 letra maiúscula'
        }
      })
    } else if (senha.search(/(?=.*[a-z])/g)) {
      this.setState({
        formError: {
          senha: true,
          message: 'Senha deve conter pelo menos 1 letra minúscula'
        }
      })
    } else if (senha.length <= 8) {
      this.setState({
        formError: {
          senha: true,
          message: 'Senha deve conter pelo menos 8 caracteres.'
        }
      })
    } else {
      this.setState({
        formError: { senha: false }
      })
      this.props.sendAlunoSenha([senha, token]).then(response => {
        if (response.type !== FAILURE_ALUNO_SENHA) browserHistory.push('/login')
      })
    }
  }

  render() {
    const { senha, confirmaSenha, formError } = this.state
    const { error, hasError } = this.props.usuario
    const usuario = this.props.usuario

    return (
      <form className="form-group col-xs-10 col-xs-offset-1 col-sm-4 col-sm-offset-4">
        <div className="input-group ">
          <FloatInput
            name="senha"
            value={senha}
            textLabel="Nova Senha"
            type="password"
            handleChange={this.handleChange}
          />
        </div>
        <div className="input-group ">
          <FloatInput
            name="confirmaSenha"
            value={confirmaSenha}
            textLabel="Confirmar Nova Senha"
            type="password"
            handleChange={this.handleChange}
          />
        </div>
        {formError.senha === true ? (
          <Alerta alertClass="alert-danger" message={formError.message} />
        ) : (
          <Alerta
            show={hasError}
            alertClass="alert-danger"
            message={error.message}
          />
        )}
        <div className="input-group text-center">
          {!usuario.isFetching ? (
            <button
              onClick={this.handleClickSenha}
              type="submit"
              className="btn btn-primary"
            >
              Enviar
            </button>
          ) : (
            <Carregando />
          )}
        </div>
      </form>
    )
  }
}

function mapStateToProps(state: Store): StateProps {
  return {
    usuario: state.aluno_usuario
  }
}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
  return {
    sendAlunoSenha: (credentials: [string, string]) =>
      dispatch(sendAlunoSenha(credentials))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AlunoCadastro)
