// @flow

import React from 'react'
import { connect } from 'react-redux'
import { getRequerimentoByPage } from '../../actions/requerimento'
import { requestTipos } from '../../actions/tipo'
import { getParecerByRequerimentoId } from '../../actions/parecer'
import { getAluno } from '../../actions/aluno'
import { formattedDate } from '../../util'
import Paginator from '../../components/Paginator'
import autobind from 'autobind-decorator'
import Carregando from '../../components/Carregando'

const requerimentosAbertosApi = 'requerimentos?size=5&'

type Props = {
  getRequerimentoByPage: Function,
  requestTipos: Function,
  getAluno: Function,
  getParecerByRequerimentoId: Function,
  requerimentos: Object,
  location: Object
}

type State = {}

class CordVisualizarRequerimento extends React.Component<Props, State> {
  constructor(props) {
    super(props)

    this.state = { currentPage: 0, tipos: [], pareceres: [], alunos: [] }
    this.props
      .getRequerimentoByPage(requerimentosAbertosApi + 'page=0')
      .then(this.requestTableContent)
  }

  @autobind
  requestTableContent() {
    const { requerimentos } = this.props.requerimentos.payload._embedded
    const alunos = []
    const pareceres = []
    const tipos = []

    // para cada requerimento
    requerimentos.forEach(requerimento => {
      // carregue o tipo
      this.props
        .requestTipos(requerimento._links.tipo.href)
        .then(tipo => {
          tipos.push(tipo.payload.tipo)
          this.setState({ tipos: tipos })
        })
        .catch(() => {
          tipos.push('')
          this.setState({ tipos: tipos })
        })

      // carregue o aluno
      this.props
        .getAluno(requerimento._links.aluno.href)
        .then(aluno => {
          alunos.push({
            nome: aluno.payload.nome,
            matricula: aluno.payload.matricula
          })
          this.setState({ alunos: alunos })
        })
        .catch(() => {
          alunos.push({ nome: '', matricula: '' })
          this.setState({ alunos: alunos })
        })

      // carregue o parecer
      this.props
        .getParecerByRequerimentoId(requerimento)
        .then(parecer => {
          pareceres.push(parecer.response.deferido)
          this.setState({ pareceres: pareceres })
        })
        .catch(() => {
          pareceres.push('')
          this.setState({ pareceres: pareceres })
        })
    })
  }

  @autobind
  getRequerimentoByPage(page) {
    return () => {
      const pageNum = page.match(/page=([0-9])+/)[1]
      this.setState({
        currentPage: parseInt(pageNum),
        tipos: [],
        pareceres: [],
        alunos: []
      })

      this.props.getRequerimentoByPage(page).then(this.requestTableContent)
    }
  }

  @autobind
  renderLines() {
    const { requerimentos } = this.props.requerimentos.payload._embedded
    const { tipos, pareceres, alunos } = this.state

    return requerimentos.map((requerimento, i) => {
      const tipo = tipos[i]
      let parecer = pareceres[i]
      const aluno = alunos[i]
      const data = formattedDate(requerimento.data)
      let nome
      let matricula = ''

      if (aluno) {
        nome = aluno.nome
        matricula = aluno.matricula
      }

      if (parecer) {
        parecer = parecer === true ? 'Deferido' : 'Indeferido'
      } else {
        parecer = 'Em Andamento'
      }

      return (
        <tr key={i}>
          <td>{tipo}</td>
          <td>{nome}</td>
          <td>{matricula}</td>
          <td>{data}</td>
          <td>{parecer}</td>
        </tr>
      )
    })
  }

  render() {
    const { requerimentos } = this.props
    const { tipos, pareceres, alunos } = this.state
    let renderTable = false

    if (requerimentos.fetched) {
      const length = requerimentos.payload._embedded.requerimentos.length
      renderTable =
        tipos.length === length &&
        pareceres.length === length &&
        alunos.length === length
    }

    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h4>Todos os Requerimentos</h4>
        </div>
        {renderTable ? (
          <div className="panel-body table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Tipo</th>
                  <th>Nome Aluno</th>
                  <th>Matrícula Aluno</th>
                  <th>Data</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>{this.renderLines()}</tbody>
            </table>
            <Paginator
              pageableEntity={requerimentos.payload}
              currentPage={this.state.currentPage}
              location={this.props.location}
              api={requerimentosAbertosApi}
              onClickHandler={this.getRequerimentoByPage}
            />
          </div>
        ) : (
          <Carregando />
        )}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    requerimentos: state.requerimentoPage
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getRequerimentoByPage: page => dispatch(getRequerimentoByPage(page)),
    requestTipos: url => dispatch(requestTipos(url)),
    getParecerByRequerimentoId: req =>
      dispatch(getParecerByRequerimentoId(req)),
    getAluno: url => dispatch(getAluno(url))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  CordVisualizarRequerimento
)
