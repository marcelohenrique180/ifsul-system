// @flow

import AlunoInfo from '../containers/aluno/AlunoInfo'
import React from 'react'
import RequerimentoView from '../containers/requerimento/RequerimentoView'

type Props = {
  params: { requerimento: string }
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
