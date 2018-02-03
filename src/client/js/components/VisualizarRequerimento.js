// @flow

import * as React from 'react'

import AlunoInfo from '../containers/aluno/AlunoInfo'
import RequerimentoForm from '../containers/requerimento/RequerimentoForm'

type Props = {
  params: { requerimento: string }
}

class VisualizarRequerimento extends React.Component<Props> {
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
              <RequerimentoForm
                requerimentoId={this.props.params.requerimento}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default VisualizarRequerimento
