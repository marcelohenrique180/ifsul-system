// @flow

import * as React from 'react'

import type { Action, Dispatch } from '../../actions/types'
import type {
  Aluno,
  State as DefaultState,
  Parecer,
  RequerimentoPage,
  Store,
  Tipo
} from '../../reducers/types'

import Carregando from '../../components/Carregando'
import { FAILURE_PARECER } from '../../actions/parecer'
import Paginator from '../../components/Paginator'
import autobind from 'autobind-decorator'
import { connect } from 'react-redux'
import { formattedDate } from '../../util'
import { getAluno } from '../../actions/aluno'
import { getId } from '../../util'
import { getParecerByRequerimentoId } from '../../actions/parecer'
import { getRequerimentoByPage } from '../../actions/requerimento'
import { requestTipos } from '../../actions/tipo'

const requerimentosAbertosApi = 'requerimentos?size=5&'

type StateProps = {
  requerimentos: DefaultState<RequerimentoPage>
}

type DispatchProps = {
  getRequerimentoByPage: string => Promise<Action<RequerimentoPage>>,
  requestTipos: string => Promise<Action<Tipo>>,
  getAluno: string => Promise<Action<Aluno>>,
  getParecerByRequerimentoId: string => Promise<Action<Parecer>>
}

type Props = StateProps &
  DispatchProps & {
    location: Object
  }

type State = {
  currentPage: number,
  tipos: Array<string>,
  pareceres: Array<?boolean>,
  alunos: Array<{ nome: string, matricula: string }>
}

class CordVisualizarRequerimento extends React.Component<Props, State> {
  state = { currentPage: 0, tipos: [], pareceres: [], alunos: [] }

  constructor(props: Props) {
    super(props)

    this.props
      .getRequerimentoByPage(requerimentosAbertosApi + 'page=0')
      .then(this.requestTableContent)
  }

  @autobind
  requestTableContent() {
    const { requerimentos } = this.props.requerimentos.payload._embedded
    const alunos: Array<{ nome: string, matricula: string }> = []
    const pareceres: Array<?boolean> = []
    const tipos: Array<string> = []

    // para cada requerimento
    requerimentos.forEach((requerimento, i) => {
      if (typeof requerimento !== 'undefined') {
        // carregue o tipo
        this.props
          .requestTipos(requerimento._links.tipo.href)
          .then((tipo: Action<Tipo>) => {
            if (typeof tipo.payload !== 'undefined')
              tipos[i] = tipo.payload.tipo
            else tipos.push('')
            this.setState({ tipos: tipos })
          })
      }

      // carregue o aluno
      this.props
        .getAluno(requerimento._links.aluno.href)
        .then((aluno: Action<Aluno>) => {
          if (typeof aluno.payload !== 'undefined')
            alunos[i] = {
              nome: aluno.payload.nome,
              matricula: aluno.payload.matricula
            }
          else alunos.push({ nome: '', matricula: '' })
          this.setState({ alunos: alunos })
        })

      // carregue o parecer
      this.props
        .getParecerByRequerimentoId(getId(requerimento._links.self.href))
        .then((parecer: Action<Parecer>) => {
          if (
            parecer.type === FAILURE_PARECER ||
            typeof parecer.payload === 'undefined'
          )
            pareceres[i] = null
          else pareceres[i] = parecer.payload.deferido
          this.setState({ pareceres: pareceres })
        })
        .catch(() => (pareceres[i] = null))
    })
  }

  @autobind
  getRequerimentoByPage(page: string): () => void {
    return () => {
      const pageNum = page.match(/page=([0-9])+/)

      if (typeof pageNum !== 'undefined' && pageNum !== null) {
        this.setState({
          currentPage: parseInt(pageNum[1]),
          tipos: [],
          pareceres: [],
          alunos: []
        })

        this.props.getRequerimentoByPage(page).then(this.requestTableContent)
      }
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
      let nome = ''
      let matricula = ''

      if (aluno) {
        nome = aluno.nome
        matricula = aluno.matricula
      }

      if (parecer !== null) {
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

function mapStateToProps(store: Store): StateProps {
  return {
    requerimentos: store.requerimentoPage
  }
}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
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
