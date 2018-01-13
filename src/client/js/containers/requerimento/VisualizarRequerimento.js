// @flow

import type { Action, Dispatch } from '../../actions/types'
import type {
  Aluno,
  Curso,
  Requerimento,
  Tipo
} from '../../reducers/types/index'
import type { State as DefaultState, Store } from '../../reducers/types'

import AlunoInfo from '../../containers/aluno/AlunoInfo'
import ParecerView from '../../containers/parecer/ParecerView'
import React from 'react'
import RequerimentoView from '../../containers/requerimento/RequerimentoView'
import { connect } from 'react-redux'
import { getRequerimento } from '../../actions/requerimento'
import { requestAluno } from '../../actions/aluno'
import { requestCursos } from '../../actions/curso'
import { requestTipos } from '../../actions/tipo'

type StateProps = {
  requerimento: DefaultState<Requerimento>
}

type DispatchProps = {
  getRequerimento: string => Promise<Action<Requerimento>>,
  requestAluno: void => Promise<Action<Aluno>>,
  requestCursos: string => Promise<Action<Curso>>,
  requestTipos: string => Promise<Action<Tipo>>
}

type Props = StateProps &
  DispatchProps & {
    params: { ['requerimento']: string }
  }

class VisualizarRequerimento extends React.Component<Props> {
  constructor(props: Props) {
    super(props)

    const reqId = this.props.params['requerimento']

    this.props
      .getRequerimento(reqId)
      .then((requerimento: Action<Requerimento>) => {
        if (typeof requerimento.payload._links !== 'undefined')
          this.props.requestTipos(requerimento.payload._links.tipo.href)
      })

    this.props.requestAluno().then((aluno: Action<Aluno>) => {
      if (typeof aluno.payload._links !== 'undefined')
        this.props.requestCursos(aluno.payload._links.curso.href)
    })
  }

  render() {
    return (
      <div>
        <div className="panel panel-ifsul">
          <div className="panel-heading text-center">
            <h3 className="panel-title">Ver Requerimento</h3>
          </div>
          <div className="panel-body">
            <div>
              <AlunoInfo />
              <RequerimentoView />
              <ParecerView />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state: Store): StateProps {
  return {
    requerimento: state.requerimento
  }
}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
  return {
    getRequerimento: reqId => dispatch(getRequerimento(reqId)),
    requestAluno: () => dispatch(requestAluno()),
    requestCursos: endpoint => dispatch(requestCursos(endpoint)),
    requestTipos: endpoint => dispatch(requestTipos(endpoint))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  VisualizarRequerimento
)
