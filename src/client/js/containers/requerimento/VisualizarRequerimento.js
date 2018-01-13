// @flow

import type { Store, State as DefaultState } from '../../reducers/types'
import type { Action, Dispatch } from '../../actions/types'
import type { RequerimentoType } from '../../reducers/reducer-requerimento'

import React from 'react'
import { connect } from 'react-redux'
import { getRequerimento } from '../../actions/requerimento'
import { requestAluno } from '../../actions/aluno'
import { requestCursos } from '../../actions/curso'
import { requestTipos } from '../../actions/tipo'
import AlunoInfo from '../../containers/aluno/AlunoInfo'
import ParecerView from '../../containers/parecer/ParecerView'
import RequerimentoView from '../../containers/requerimento/RequerimentoView'

type StateProps = {
  requerimento: DefaultState<RequerimentoType>
}

type DispatchProps = {
  getRequerimento: string => Promise<Action>,
  requestAluno: void => Promise<Action>,
  requestCursos: string => Promise<Action>,
  requestTipos: string => Promise<Action>
}

type Props = StateProps &
  DispatchProps & {
    params: { ['requerimento']: string }
  }

class VisualizarRequerimento extends React.Component<Props> {
  constructor(props: Props) {
    super(props)

    const reqId = this.props.params['requerimento']

    this.props.getRequerimento(reqId).then(requerimento => {
      this.props.requestTipos(requerimento.payload._links.tipo.href)
    })

    this.props
      .requestAluno()
      .then(aluno => this.props.requestCursos(aluno.payload._links.curso.href))
  }

  render() {
    const { requerimento } = this.props

    return (
      <div>
        <div className="panel panel-ifsul">
          <div className="panel-heading text-center">
            <h3 className="panel-title">Ver Requerimento</h3>
          </div>
          <div className="panel-body">
            {requerimento.fetched && (
              <div>
                <AlunoInfo />
                <RequerimentoView />
                <ParecerView />
              </div>
            )}
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
