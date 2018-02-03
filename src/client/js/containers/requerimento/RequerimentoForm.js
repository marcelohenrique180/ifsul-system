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
import { getAluno, resetAluno } from '../../actions/aluno'
import { getRequerimento, resetRequerimento } from '../../actions/requerimento'
import { requestCursos, resetCurso } from '../../actions/curso'
import { requestTipos, resetTipo } from '../../actions/tipo'

import AlunoInfo from '../../containers/aluno/AlunoInfo'
import Carregando from '../../components/Carregando'
import { Divider } from 'material-ui'
import RequerimentoView from '../../containers/requerimento/RequerimentoView'
import { connect } from 'react-redux'

type StateProps = {
  requerimento: DefaultState<Requerimento>,
  aluno: DefaultState<Aluno>,
  tipo: DefaultState<Tipo>,
  curso: DefaultState<Curso>
}

type DispatchProps = {
  getRequerimento: string => Promise<Action<Requerimento>>,
  requestCursos: string => Promise<Action<Curso>>,
  getAluno: string => Promise<Action<Aluno>>,
  requestTipos: string => Promise<Action<Tipo>>,
  resetEverything: void => void
}

type ExternalProps = {
  children: React$Node,
  requerimentoId: string
}

type Props = StateProps & DispatchProps & ExternalProps

class RequerimentoForm extends React.Component<Props> {
  constructor(props: Props) {
    super(props)

    const {
      resetEverything,
      getRequerimento,
      requestTipos,
      getAluno,
      requestCursos
    } = this.props

    resetEverything()

    getRequerimento(this.props.requerimentoId).then(
      (requerimento: Action<Requerimento>) => {
        if (requerimento.payload) {
          requestTipos(requerimento.payload._links.tipo.href)
        }
        if (requerimento.payload) {
          getAluno(requerimento.payload._links.aluno.href).then(
            (aluno: Action<Aluno>) => {
              if (typeof aluno.payload !== 'undefined') {
                requestCursos(aluno.payload._links.curso.href)
              }
            }
          )
        }
      }
    )
  }

  render() {
    const { requerimento, tipo } = this.props

    const fetched = requerimento.fetched && tipo.fetched

    if (!fetched) return <Carregando />

    return (
      <div style={{ margin: '0 1em' }}>
        <h3 style={{ textAlign: 'center' }}>Requerimento</h3>
        <AlunoInfo />
        <Divider />
        <RequerimentoView
          requerimento={requerimento.payload}
          tipo={tipo.payload}
        />
        <Divider />
        {this.props.children}
      </div>
    )
  }
}

function mapStateToProps(store: Store): StateProps {
  return {
    requerimento: store.requerimento,
    aluno: store.aluno,
    tipo: store.tipos,
    curso: store.curso
  }
}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
  return {
    requestCursos: url => dispatch(requestCursos(url)),
    getAluno: url => dispatch(getAluno(url)),
    getRequerimento: reqId => dispatch(getRequerimento(reqId)),
    requestTipos: endpoint => dispatch(requestTipos(endpoint)),
    resetEverything: () => {
      dispatch(resetRequerimento())
      dispatch(resetTipo())
      dispatch(resetAluno())
      dispatch(resetCurso())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RequerimentoForm)
