// @flow

import { getId, handleChange } from '../../util'

import Carregando from '../../components/Carregando'
import { Link } from 'react-router'
import React from 'react'
import autobind from 'autobind-decorator'
import { connect } from 'react-redux'
import { getAluno } from '../../actions/aluno'
import { getRequerimentosEmAberto } from '../../actions/requerimento'
import { reloadCordRequerimento } from '../../containers/requerimento/CordRequerimento'

type Props = {
  getRequerimentosEmAberto: Function,
  getAluno: Function,
  loadRequerimento: Function,
  reloadCordRequerimento: Function,
  router: Object,
  requerimentosAbertos: Object
}

type State = Object

class CordRequerimentoAberto extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = { search: '', requerimentos: [], filteredRequerimentos: [] }
    this.props.getRequerimentosEmAberto().then(reqsAbertos => {
      reqsAbertos.payload._embedded.requerimentos.forEach(requerimento => {
        this.props.getAluno(requerimento._links.aluno.href).then(aluno => {
          this.setState({
            requerimentos: this.state.requerimentos.concat([
              {
                result:
                  'Req.Nº' +
                  getId(requerimento._links.self.href) +
                  ' ' +
                  aluno.payload.nome +
                  ' ' +
                  aluno.payload.matricula,
                requerimento_id: getId(requerimento._links.self.href)
              }
            ])
          })
          this.setState({ filteredRequerimentos: this.state.requerimentos })
        })
      })
    })
    this.reloadCordRequerimento = reloadCordRequerimento.bind(this)
    this.handleChange = handleChange.bind(this)
  }

  @autobind
  onItemClick(id) {
    if (typeof id !== 'undefined') {
      return () => {
        this.props.loadRequerimento({
          push: this.props.router.push,
          id,
          reload: this.reloadCordRequerimento
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
  handleSearch(event) {
    this.handleChange(event)

    this.setState({
      filteredRequerimentos: this.state.requerimentos.filter(req =>
        req.result.toLowerCase().includes(event.target.value.toLowerCase())
      )
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
            <Link
              to="/menu/cordcurso/requerimento/visualizar"
              className="center-block text-center"
            >
              <b>Ver Todos</b>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    requerimentosAbertos: state.requerimentos_abertos
  }
}

function mapDispatchToProps(dispatch) {
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
