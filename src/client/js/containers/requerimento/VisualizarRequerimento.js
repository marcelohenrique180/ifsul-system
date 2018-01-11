// @flow

import React from 'react'
import { connect } from 'react-redux'
import { getRequerimento } from '../../actions/requerimento'
import { requestAluno } from '../../actions/aluno'
import { requestCursos } from '../../actions/curso'
import { requestTipos } from '../../actions/tipo'
import AlunoInfo from '../../containers/aluno/AlunoInfo'
import ParecerView from '../../containers/parecer/ParecerView'
import RequerimentoView from '../../containers/requerimento/RequerimentoView'

type Props = {
  dispatch: Function,
  params: { requerimento: string },
  requerimento: Object
}

class VisualizarRequerimento extends React.Component<Props> {
  constructor(props) {
    super(props)
    const { dispatch } = this.props

    const reqId = this.props.params['requerimento']
    dispatch(getRequerimento(reqId)).then(requerimento => {
      dispatch(requestTipos(requerimento.response._links.tipo.href))
    })

    dispatch(requestAluno()).then(aluno =>
      dispatch(requestCursos(aluno.response._links.curso.href))
    )
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

function mapStateToProps(state) {
  return {
    requerimento: state.requerimento
  }
}

export default connect(mapStateToProps)(VisualizarRequerimento)
