// @flow

import type { Action, Dispatch } from '../actions/types'
import type { Aluno, Curso, Requerimento, Tipo } from '../reducers/types/index'
import type { State as DefaultState, Store } from '../reducers/types'

import AlunoInfo from '../containers/aluno/AlunoInfo'
import React from 'react'
import RequerimentoView from '../containers/requerimento/RequerimentoView'
import { connect } from 'react-redux'
import { requestAluno } from '../actions/aluno'
import { requestCursos } from '../actions/curso'

type Props = {
  params: { ['requerimento']: string }
}

class VisualizarRequerimento extends React.Component<Props> {
  render() {
    const reqId = this.props.params['requerimento']

    return (
      <div>
        <div className="panel panel-ifsul">
          <div className="panel-heading text-center">
            <h3 className="panel-title">Ver Requerimento</h3>
          </div>
          <div className="panel-body">
            <div>
              <AlunoInfo />
              <RequerimentoView requerimentoId={reqId} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default VisualizarRequerimento
