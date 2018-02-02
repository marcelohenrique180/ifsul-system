// @flow

import * as React from 'react'

import type { Action, Dispatch } from '../../actions/types/index'
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
import RequerimentoInsert from './RequerimentoInsert'
import type { SendRequerimento } from '../../actions/requerimento'
import { areFieldsEmpty } from '../../util'
import autobind from 'autobind-decorator'
import { connect } from 'react-redux'
import { requestAluno } from '../../actions/aluno'
import { requestCursos } from '../../actions/curso'
import { requestTipos } from '../../actions/tipo'
import { sendRequerimento } from '../../actions/requerimento'

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

class AlunoRequerimento extends React.Component<Props> {
  constructor(props: Props) {
    super(props)

    this.props.requestTipos()
    this.props
      .requestAluno()
      .then(
        aluno =>
          aluno.payload
            ? this.props.requestCursos(aluno.payload._links.curso.href)
            : null
      )
  }

  @autobind
  handleChange(event: SyntheticInputEvent<HTMLInputElement>) {
    const { value, name } = event.target

    this.setState({ [name]: value })
  }

  render() {
    const { curso, aluno, tipos } = this.props
    const fetched = curso.fetched && aluno.fetched && tipos.fetched

    if (!fetched || !tipos.payload._embedded) {
      return <Carregando />
    }

    return (
      <div>
        <div className="panel panel-ifsul">
          <div className="panel-heading text-center">
            <h3 className="panel-title">Criar Requerimento</h3>
          </div>
          <div className="panel-body">
            <div className="container-fluid">
              <div className="row">
                <div className="form-group col-centered">
                  <AlunoInfo />
                  <RequerimentoInsert
                    tipos={tipos.payload._embedded.tipos}
                    aluno={aluno.payload}
                  />
                </div>
              </div>
            </div>
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
