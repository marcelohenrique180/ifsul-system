// @flow

import * as React from 'react'

import type { Action, ActionApi, Dispatch } from '../../actions/types/index'
import type {
  Aluno,
  Curso,
  State as DefaultState,
  Requerimento,
  Store,
  Tipo
} from '../../reducers/types/index'

import Alerta from '../../components/Alerta'
import AlunoInfo from '../../containers/aluno/AlunoInfo'
import Carregando from '../../components/Carregando'
import type { SendRequerimento } from '../../actions/requerimento'
import { areFieldsEmpty } from '../../util'
import autobind from 'autobind-decorator'
import { connect } from 'react-redux'
import { requestAluno } from '../../actions/aluno'
import { requestCursos } from '../../actions/curso'
import { requestTipos } from '../../actions/tipo'
import { sendRequerimento } from '../../actions/requerimento'

const defaultState = {
  tipo: '',
  requerimento: '',
  justificativa: '',
  erro: { erro: false, message: '' },
  enviado: false
}

type StateProps = {
  aluno: DefaultState<Aluno>,
  tipos: DefaultState<Tipo>,
  curso: DefaultState<Curso>,
  requerimento: DefaultState<Requerimento>
}

type DispatchProps = {
  requestTipos: (?string) => Promise<Action<Tipo>>,
  requestAluno: () => Promise<Action<Aluno>>,
  requestCursos: string => Promise<Action<Curso>>,
  sendRequerimento: SendRequerimento => Promise<Action<Requerimento>>
}

type Props = StateProps &
  DispatchProps & {
    router: { push: string => void }
  }

type State = {
  tipo: string,
  requerimento: string,
  justificativa: string,
  erro: { erro: boolean, message: string },
  enviado: boolean
}

class AlunoRequerimento extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = defaultState

    this.props.requestTipos()
    this.props
      .requestAluno()
      .then(
        aluno =>
          aluno.payload !== null && typeof aluno.payload !== 'undefined'
            ? this.props.requestCursos(aluno.payload._links.curso.href)
            : null
      )
  }

  renderTipos() {
    if (
      typeof this.props.tipos.payload._embedded !== 'undefined' &&
      typeof this.props.tipos.payload !== 'undefined'
    ) {
      return this.props.tipos.payload._embedded.tipos.map(tipo => {
        return (
          <option key={tipo._links.self.href} value={tipo._links.self.href}>
            {tipo.tipo}
          </option>
        )
      })
    }
    return ''
  }

  @autobind
  handleSubmit(e: SyntheticInputEvent<HTMLInputElement>) {
    const { tipo, requerimento, justificativa } = this.state
    const notNullFields = [tipo, requerimento, justificativa]
    const aluno = this.props.aluno.payload._links.aluno.href

    const error = areFieldsEmpty(notNullFields)
    if (error) {
      this.setState({
        erro: {
          erro: true,
          message: 'Algum campo obrigatório não foi preenchido.'
        }
      })
    } else {
      this.setState({ erro: { erro: false, message: '' } })
      this.props
        .sendRequerimento({ tipo, requerimento, justificativa, aluno })
        .then(() => this.setState({ enviado: true }))
    }
    e.preventDefault()
  }

  @autobind
  onVoltar() {
    this.setState(defaultState)
    this.props.router.push('/menu/aluno/requerimento/visualizar')
  }

  @autobind
  handleChange(event: SyntheticInputEvent<HTMLInputElement>) {
    const { value, name } = event.target

    this.setState({ [name]: value })
  }

  render() {
    const tiposState = this.props.tipos
    const requerimentoProp = this.props.requerimento

    const { tipo, requerimento, justificativa, erro, enviado } = this.state

    return (
      <div>
        <div className="panel panel-ifsul">
          <div className="panel-heading text-center">
            <h3 className="panel-title">Criar Requerimento</h3>
          </div>
          <div className="panel-body">
            {enviado ? (
              <div>
                <div className="row">
                  <Alerta
                    show={true}
                    alertClass="alert-success"
                    message="Enviado com sucesso."
                  />
                </div>
                <div className="text-center">
                  <button className="btn btn-custom" onClick={this.onVoltar}>
                    Voltar
                  </button>
                </div>
              </div>
            ) : (
              <div className="container-fluid">
                <div className="row">
                  {tiposState.fetched && (
                    <div className="form-group col-centered">
                      <AlunoInfo />
                      <div className="form-group">
                        <div>
                          <label htmlFor="tipo">Tipo</label>
                          <select
                            name="tipo"
                            id="tipo"
                            className="form-control"
                            value={tipo}
                            onChange={this.handleChange}
                          >
                            <option value="" />
                            {this.renderTipos()}
                          </select>
                        </div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="requerimento">Requerimento</label>
                        <textarea
                          name="requerimento"
                          id="requerimento"
                          rows="5"
                          className="form-control"
                          value={requerimento}
                          onChange={this.handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="justificativa">Justificativa</label>
                        <textarea
                          name="justificativa"
                          id="justificativa"
                          rows="5"
                          className="form-control"
                          value={justificativa}
                          onChange={this.handleChange}
                        />
                      </div>
                      <Alerta
                        show={erro.erro}
                        message={erro.message}
                        alertClass="alert-danger"
                      />
                      <div className="input-group text-center">
                        {requerimentoProp.isFetching ? (
                          <Carregando />
                        ) : (
                          <button
                            type="submit"
                            className="btn btn-custom"
                            onClick={this.handleSubmit}
                          >
                            Enviar
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(store: Store): StateProps {
  return {
    aluno: store.aluno,
    tipos: store.tipos,
    curso: store.curso,
    requerimento: store.requerimento
  }
}

function mapsDispatchToProps(dispatch: Dispatch): DispatchProps {
  return {
    requestTipos: (url?: ?string) => dispatch(requestTipos(url)),
    requestAluno: () => dispatch(requestAluno()),
    requestCursos: url => dispatch(requestCursos(url)),
    sendRequerimento: requerimento => dispatch(sendRequerimento(requerimento))
  }
}

export default connect(mapStateToProps, mapsDispatchToProps)(AlunoRequerimento)
