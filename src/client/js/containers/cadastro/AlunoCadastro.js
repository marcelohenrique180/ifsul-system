// @flow

import type { Store, State as DefaultState } from '../../reducers/types'
import type { Dispatch, Action } from '../../actions/types'
import type { MatriculaType } from '../../reducers/reducer-matricula'

import { connect } from 'react-redux'
import { handleChange } from '../../util'
import { sendAlunoMatricula } from '../../actions/aluno'
import { novaMatricula } from '../../actions/matricula'

import * as React from 'react'
import autobind from 'autobind-decorator'
import FloatInput from '../../components/FloatInput'
import Alerta from '../../components/Alerta'
import Carregando from '../../components/Carregando'

type StateProps = {
  matricula: DefaultState<MatriculaType>
}

type DispatchProps = {
  sendAlunoMatricula: (matricula: string) => Promise<Action>,
  novaMatricula: () => Action | Promise<Action>
}

type Props = StateProps & DispatchProps

type State = {
  matricula: string,
  formError: {
    [string]: boolean
  }
}

class AlunoCadastro extends React.Component<Props, State> {
  state = {
    matricula: '',
    formError: { matricula: false }
  }

  @autobind
  handleChangeForm(event: SyntheticInputEvent<HTMLInputElement>) {
    const { name, value } = event.target

    this.setState({
      formError: { [name]: false },
      [name]: value
    })
  }

  @autobind
  novaMatricula() {
    this.props.novaMatricula()
    this.setState({ matricula: '' })
  }

  @autobind
  handleClickMatricula(e: SyntheticEvent<HTMLButtonElement>) {
    e.preventDefault()
    const { matricula } = this.state
    if (matricula === '') {
      this.setState({ formError: { matricula: true } })
    } else {
      this.setState({ formError: { matricula: false } })
      this.props.sendAlunoMatricula(matricula)
    }
  }

  render() {
    const matriculaRequest = this.props.matricula
    const { matricula, formError } = this.state
    const { hasError, error } = this.props.matricula

    return matriculaRequest.fetched ? (
      <div className="text-center">
        <h5 className="text-success">
          Brevemente será enviado um e-mail à você com o link de cadastro!
        </h5>
        <button onClick={this.novaMatricula} className="btn btn-success">
          Novo Cadastro
        </button>
      </div>
    ) : (
      <form
        target="#"
        className="form-group col-xs-10 col-xs-offset-1 col-sm-4 col-sm-offset-4"
      >
        <div className="input-group">
          <FloatInput
            name="matricula"
            value={matricula}
            textLabel="Insira sua matrícula"
            handleChange={this.handleChangeForm}
          />
        </div>
        {formError.matricula ? (
          <Alerta
            alertClass="alert-danger"
            message="Favor, insira a Matrícula."
          />
        ) : (
          <Alerta
            show={hasError}
            alertClass="alert-danger"
            message={error.message}
          />
        )}
        <div className="input-group text-center">
          {!matriculaRequest.isFetching ? (
            <button
              onClick={this.handleClickMatricula}
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
    matricula: state.matricula
  }
}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
  return {
    sendAlunoMatricula: (matricula: string) =>
      dispatch(sendAlunoMatricula(matricula)),
    novaMatricula: () => dispatch(novaMatricula())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AlunoCadastro)
