// @flow

import React from 'react'
import { connect } from 'react-redux'
import Carregando from '../../components/Carregando'
import RequerimentoView from '../../containers/requerimento/RequerimentoView'
import AlunoInfo from '../../containers/aluno/AlunoInfo'
import ParecerInsert from '../../containers/parecer/ParecerInsert'
import { getRequerimento, resetRequerimento } from '../../actions/requerimento'
import { requestTipos, resetTipo } from '../../actions/tipo'
import { getAluno, resetAluno } from '../../actions/aluno'
import { requestCursos, resetCurso } from '../../actions/curso'

export function reloadCordRequerimento(dispatch, requerimentoId) {
  dispatch(resetRequerimento())
  dispatch(resetTipo())
  dispatch(resetAluno())
  dispatch(resetCurso())

  dispatch(getRequerimento(requerimentoId)).then(requerimento => {
    dispatch(requestTipos(requerimento.response._links.tipo.href))
    dispatch(getAluno(requerimento.response._links.aluno.href)).then(aluno => {
      dispatch(requestCursos(aluno.response._links.curso.href))
    })
  })
}

type Props = {
  dispatch: Function,
  requerimento: Object,
  aluno: Object,
  tipo: Object,
  curso: Object,
  params: Object
}

class CordRequerimento extends React.Component<Props> {
  constructor(props) {
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
    const alunoProp = this.props.aluno
    const requerimentoProp = this.props.requerimento
    const tipoProp = this.props.tipo
    const cursoProp = this.props.curso

    const display =
      requerimentoProp.fetched &&
      alunoProp.fetched &&
      tipoProp.fetched &&
      cursoProp.fetched

    return (
      <div>
        <div className="panel panel-ifsul">
          <div className="panel-heading text-center">
            <h3 className="panel-title">Requerimento</h3>
          </div>
          <div className="panel-body">
            <div className="container-fluid">
              <div className="row">
                {display ? (
                  <div className="form-group col-centered">
                    <AlunoInfo />
                    <RequerimentoView />
                    <ParecerInsert {...this.props} />
                  </div>
                ) : (
                  <Carregando />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    requerimento: state.requerimento,
    aluno: state.aluno,
    tipo: state.tipos,
    curso: state.curso
  }
}

export default connect(mapStateToProps)(CordRequerimento)
