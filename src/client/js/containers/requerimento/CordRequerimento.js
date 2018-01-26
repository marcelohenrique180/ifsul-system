// @flow

import type { Action, Dispatch } from '../../actions/types/index'
import type {
  Aluno,
  State as DefaultState,
  Requerimento,
  Store
} from '../../reducers/types/index'
import { getAluno, resetAluno } from '../../actions/aluno'
import { getRequerimento, resetRequerimento } from '../../actions/requerimento'
import { requestCursos, resetCurso } from '../../actions/curso'
import { requestTipos, resetTipo } from '../../actions/tipo'

import AlunoInfo from '../../containers/aluno/AlunoInfo'
import { Divider } from 'material-ui'
import React from 'react'
import RequerimentoView from '../../containers/requerimento/RequerimentoView'
import { connect } from 'react-redux'

export function reloadCordRequerimento(
  dispatch: Dispatch,
  requerimentoId: string
): void {
  dispatch(resetRequerimento())
  dispatch(resetTipo())
  dispatch(resetAluno())
  dispatch(resetCurso())

  dispatch(getRequerimento(requerimentoId)).then(
    (requerimento: Action<Requerimento>) => {
      if (typeof requerimento.payload !== 'undefined') {
        dispatch(requestTipos(requerimento.payload._links.tipo.href))
      }
      if (typeof requerimento.payload !== 'undefined') {
        dispatch(getAluno(requerimento.payload._links.aluno.href)).then(
          (aluno: Action<Aluno>) => {
            if (typeof aluno.payload !== 'undefined') {
              dispatch(requestCursos(aluno.payload._links.curso.href))
            }
          }
        )
      }
    }
  )
}

type StateProps = {
  requerimento: DefaultState<Requerimento>,
  aluno: Object,
  tipo: Object,
  curso: Object
}

type DispatchProps = {}

type Props = StateProps &
  DispatchProps & {
    params: { requerimento: string },
    dispatch: Dispatch
  }

class CordRequerimento extends React.Component<Props> {
  constructor(props: Props) {
    super(props)
    const { dispatch } = this.props

    if (
      this.props.requerimento.fetched === false &&
      this.props.requerimento.isFetching === false
    ) {
      reloadCordRequerimento.bind(this)(
        dispatch,
        this.props.params['requerimento']
      )
    }
  }

  render() {
    return (
      <div style={{ margin: '0 1em' }}>
        <h3 style={{ textAlign: 'center' }}>Requerimento</h3>
        <AlunoInfo />
        <Divider />
        <RequerimentoView requerimentoId={this.props.params['requerimento']} />
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

export default connect(mapStateToProps)(CordRequerimento)
