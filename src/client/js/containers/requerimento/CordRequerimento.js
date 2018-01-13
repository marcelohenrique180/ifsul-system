// @flow

import { connect } from 'react-redux'
import { getAluno, resetAluno } from '../../actions/aluno'
import { getRequerimento, resetRequerimento } from '../../actions/requerimento'
import { requestCursos, resetCurso } from '../../actions/curso'
import { requestTipos, resetTipo } from '../../actions/tipo'

import React from 'react'

import AlunoInfo from '../../containers/aluno/AlunoInfo'
import Carregando from '../../components/Carregando'
import RequerimentoView from '../../containers/requerimento/RequerimentoView'
import ParecerInsert from '../../containers/parecer/ParecerInsert'

export function reloadCordRequerimento(dispatch, requerimentoId) {
  dispatch(resetRequerimento())
  dispatch(resetTipo())
  dispatch(resetAluno())
  dispatch(resetCurso())

  dispatch(getRequerimento(requerimentoId)).then(requerimento => {
    dispatch(requestTipos(requerimento.payload._links.tipo.href))
    dispatch(getAluno(requerimento.payload._links.aluno.href)).then(aluno => {
      dispatch(requestCursos(aluno.payload._links.curso.href))
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

function mapStateToProps(store) {
  return {
    requerimento: store.requerimento,
    aluno: store.aluno,
    tipo: store.tipos,
    curso: store.curso
  }
}

export default connect(mapStateToProps)(CordRequerimento)
