// @flow

import { connect } from 'react-redux'
import { Link } from 'react-router'
import { getRequerimentoByPage } from '../../actions/requerimento'
import { requestTipos } from '../../actions/tipo'
import { callApi } from '../../actions/middleware/api'
import { getId } from '../../util'

import React from 'react'
import Carregando from '../../components/Carregando'
import Paginator from '../../components/Paginator'

const requerimentoApi = 'requerimentos/search/findAllAlunoEndpoint?size=5&'

type Props = {
  dispatch: Function,
  requerimentos: Object,
  location: Object
}

type State = {}

class AlunoVisualizarRequerimento extends React.Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = { currentPage: 0, tipos: [], pareceres: [] }
    const { dispatch } = this.props

    this.requestTableContent = this.requestTableContent.bind(this)
    dispatch(getRequerimentoByPage(requerimentoApi + 'page=0')).then(
      this.requestTableContent
    )

    this.getRequerimentoByPage = this.getRequerimentoByPage.bind(this)
    this.renderLines = this.renderLines.bind(this)
  }

  requestTableContent(response) {
    const { dispatch } = this.props
    const { requerimentos } = response.payload._embedded
    const tipos = []
    const pareceres = []

    for (let i = 0; i < requerimentos.length; i++) {
      dispatch(requestTipos(requerimentos[i]._links.tipo.href))
        .then(tipo => {
          tipos[i] = tipo
          this.setState({ tipos })
        })
        .catch(() => {
          tipos[i] = ''
          this.setState({ tipos })
        })

      let requerimentoId = requerimentos[i]._links.self.href.match(/\d+$/)[0]
      callApi(
        'pareceres/search/findByRequerimentoId?id=' + requerimentoId,
        {},
        true
      )
        .then(parecer => {
          pareceres[i] = parecer
          this.setState({ pareceres })
        })
        .catch(() => {
          pareceres[i] = ''
          this.setState({ pareceres })
        })
    }
  }

  getRequerimentoByPage(page) {
    return () => {
      const pageNum = page.match(/page=([0-9])+/)[1]
      this.setState({ currentPage: parseInt(pageNum) })

      this.props
        .dispatch(getRequerimentoByPage(page))
        .then(this.requestTableContent)
    }
  }

  renderLines() {
    const { requerimentos } = this.props.requerimentos.payload._embedded
    const { tipos, pareceres } = this.state

    return (
      <tbody>
        {requerimentos.map((requerimento, i) => {
          const tipo = tipos[i] || null
          const parecer = pareceres[i] || null
          const requerimentoId = getId(requerimento)

          return (
            <tr key={i}>
              <td>
                {tipo !== null ? (
                  <Link
                    to={'/menu/aluno/requerimento/visualizar/' + requerimentoId}
                  >
                    {tipo.payload.tipo}
                  </Link>
                ) : (
                  <p>&nbsp;</p>
                )}
              </td>
              <td>{requerimento.requerimento}</td>
              {parecer ? (
                <td>
                  {parecer.deferido === true ? 'Deferido' : 'Não Deferido'}
                </td>
              ) : (
                <td>Em Andamento</td>
              )}
              <td>
                {parecer === null ? <span>&nbsp;</span> : parecer.parecer}
              </td>
            </tr>
          )
        })}
      </tbody>
    )
  }

  render() {
    const requerimentosProp = this.props.requerimentos
    let data = <Carregando />

    if (requerimentosProp.fetched) {
      const { requerimentos } = requerimentosProp.payload._embedded

      if (requerimentos.length > 0) {
        data = (
          <div className="panel-body table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Tipo</th>
                  <th>Requerimento</th>
                  <th>Status</th>
                  <th>Parecer</th>
                </tr>
              </thead>
              {this.renderLines()}
            </table>
            <Paginator
              pageableEntity={this.props.requerimentos.payload}
              currentPage={this.state.currentPage}
              location={this.props.location}
              api={requerimentoApi}
              onClickHandler={this.getRequerimentoByPage}
            />
          </div>
        )
      } else if (requerimentos.length === 0) {
        data = (
          <h4 className="text-center">
            Você ainda não possui qualquer requerimento.
          </h4>
        )
      }
    }

    return (
      <div>
        <div className="panel panel-default">
          <div className="panel-heading">Meus Requerimentos</div>
          {data}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    requerimentos: state.requerimentoPage
  }
}

export default connect(mapStateToProps)(AlunoVisualizarRequerimento)
