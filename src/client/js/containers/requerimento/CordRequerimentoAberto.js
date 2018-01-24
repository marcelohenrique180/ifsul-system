// @flow

import type { Action, Dispatch } from '../../actions/types/index'
import type {
  Aluno,
  State as DefaultState,
  RequerimentoAberto,
  Store
} from '../../reducers/types/index'

import Carregando from '../../components/Carregando'
import React from 'react'
import autobind from 'autobind-decorator'
import { connect } from 'react-redux'
import { getAluno } from '../../actions/aluno'
import { getId } from '../../util'
import { getRequerimentosEmAberto } from '../../actions/requerimento'
import { reloadCordRequerimento } from '../../containers/requerimento/CordRequerimento'

type StateProps = {
  requerimentosAbertos: DefaultState<RequerimentoAberto>
}

type DispatchProps = {
  getRequerimentosEmAberto: () => Promise<Action<RequerimentoAberto>>,
  getAluno: string => Promise<Action<Aluno>>,
  loadRequerimento: ({
    push: string => void,
    id: string,
    reload: (Dispatch, string) => void
  }) => void
}

type Props = StateProps &
  DispatchProps & {
    router: {
      push: string => void
    }
  }

type State = {
  search: string,
  requerimentos: Array<{ result: string, requerimento_id: string }>,
  filteredRequerimentos: Array<{ result: string, requerimento_id: string }>
}

class CordRequerimentoAberto extends React.Component<Props, State> {
  state = { search: '', requerimentos: [], filteredRequerimentos: [] }

  constructor(props: Props) {
    super(props)

    this.props.getRequerimentosEmAberto().then(reqsAbertos => {
      if (typeof reqsAbertos.payload !== 'undefined') {
        reqsAbertos.payload._embedded.requerimentos.forEach(requerimento => {
          this.props
            .getAluno(requerimento._links.aluno.href)
            .then(alunoResponse => {
              const aluno =
                typeof alunoResponse.payload !== 'undefined'
                  ? alunoResponse.payload
                  : { nome: '', matricula: '' }
              this.setState({
                requerimentos: this.state.requerimentos.concat([
                  {
                    result:
                      'Req.Nº' +
                      getId(requerimento._links.self.href) +
                      ' ' +
                      aluno.nome +
                      ' ' +
                      aluno.matricula,
                    requerimento_id: getId(requerimento._links.self.href)
                  }
                ])
              })
              this.setState({ filteredRequerimentos: this.state.requerimentos })
            })
        })
      }
    })
  }

  @autobind
  onItemClick(id) {
    if (typeof id !== 'undefined') {
      return () => {
        this.props.loadRequerimento({
          push: this.props.router.push,
          id,
          reload: reloadCordRequerimento
        })
      }
    }
  }

  @autobind
  renderRequerimentos() {
    const filteredRequerimentos = this.state.filteredRequerimentos.filter(
      filteredReq =>
        this.props.requerimentosAbertos.payload._embedded.requerimentos.filter(
          openReq =>
            filteredReq.requerimento_id === getId(openReq._links.self.href)
        ).length > 0
    )

    return filteredRequerimentos.map((reqAberto, i) => {
      return (
        <li
          key={i}
          className="list-group-item list-group-item--clickable"
          tabIndex={0}
          onKeyPress={this.onItemClick(reqAberto.requerimento_id)}
          onClick={this.onItemClick(reqAberto.requerimento_id)}
        >
          {reqAberto.result}{' '}
        </li>
      )
    })
  }

  @autobind
  handleSearch(event: SyntheticInputEvent<HTMLInputElement>) {
    const { name, value } = event.target

    this.setState({
      filteredRequerimentos: this.state.requerimentos.filter(req =>
        req.result.toLowerCase().includes(event.target.value.toLowerCase())
      ),
      [name]: value
    })
  }

  render() {
    const { requerimentosAbertos } = this.props

    return (
      <div>
        <div className="panel panel-default panel--requerimentos">
          <div className="panel-heading">Requerimentos em Aberto</div>
          <div className="panel-body">
            <div className="panel panel-default">
              <div className="panel-heading">
                <div className="input-group">
                  <input
                    id="search"
                    className="form-control"
                    type="text"
                    placeholder="Pesquisar"
                    name="search"
                    onChange={this.handleSearch}
                    value={this.state.search}
                  />
                </div>
              </div>
              <div className="panel-body panel-body--requerimentos">
                {requerimentosAbertos.isFetching && <Carregando />}
                {requerimentosAbertos.fetched && (
                  <ul className="list-group">{this.renderRequerimentos()}</ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state: Store): StateProps {
  return {
    requerimentosAbertos: state.requerimentos_abertos
  }
}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
  return {
    getRequerimentosEmAberto: () => dispatch(getRequerimentosEmAberto()),
    getAluno: url => dispatch(getAluno(url)),
    loadRequerimento: ({ push, id, reload }) => {
      push('/menu/cordcurso/requerimento/' + id)
      reload(dispatch, id)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  CordRequerimentoAberto
)
