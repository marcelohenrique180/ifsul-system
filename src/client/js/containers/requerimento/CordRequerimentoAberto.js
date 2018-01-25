// @flow

import type { Action, Dispatch } from '../../actions/types/index'
import type {
  Aluno,
  State as DefaultState,
  Requerimento,
  RequerimentoAberto,
  Store
} from '../../reducers/types/index'

import FontIcon from 'material-ui/FontIcon'
import React from 'react'
import TextField from 'material-ui/TextField'
import autobind from 'autobind-decorator'
import { connect } from 'react-redux'
import { getAluno } from '../../actions/aluno'
import { getId } from '../../util'
import { getRequerimentosEmAberto } from '../../actions/requerimento'
import { reloadCordRequerimento } from '../../containers/requerimento/CordRequerimento'

const searchStyle = {
  display: 'flex',
  alignItems: 'center'
}

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
  requerimentos: Array<{ search: string, requerimento_id: string }>,
  filteredRequerimentos: Array<{ search: string, requerimento_id: string }>,
  viewData: Array<{ requerimento: Requerimento, aluno: Aluno }>
}

class CordRequerimentoAberto extends React.Component<Props, State> {
  state = {
    search: '',
    requerimentos: [],
    filteredRequerimentos: [],
    viewData: []
  }

  constructor(props: Props) {
    super(props)

    this.props.getRequerimentosEmAberto().then(reqsAbertos => {
      if (typeof reqsAbertos.payload !== 'undefined') {
        reqsAbertos.payload._embedded.requerimentos.forEach(
          (requerimento: Requerimento) => {
            this.props
              .getAluno(requerimento._links.aluno.href)
              .then((alunoResponse: Action<Aluno>) => {
                if (typeof alunoResponse.payload !== 'undefined') {
                  this.setState({
                    requerimentos: this.state.requerimentos.concat([
                      {
                        search:
                          getId(requerimento._links.self.href) +
                          ' ' +
                          alunoResponse.payload.nome +
                          ' ' +
                          alunoResponse.payload.matricula,
                        requerimento_id: getId(requerimento._links.self.href)
                      }
                    ]),
                    viewData: this.state.viewData.concat([
                      {
                        requerimento: requerimento,
                        aluno: alunoResponse.payload
                      }
                    ])
                  })
                }
                this.setState({
                  filteredRequerimentos: this.state.requerimentos
                })
              })
          }
        )
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
          tabIndex={0}
          onKeyPress={this.onItemClick(reqAberto.requerimento_id)}
          onClick={this.onItemClick(reqAberto.requerimento_id)}
        >
          {reqAberto.search}{' '}
        </li>
      )
    })
  }

  @autobind
  handleSearch(event: SyntheticInputEvent<HTMLInputElement>) {
    const { name, value } = event.target

    this.setState({
      filteredRequerimentos: this.state.requerimentos.filter(req =>
        req.search.toLowerCase().includes(event.target.value.toLowerCase())
      ),
      [name]: value
    })
  }

  render() {
    const { requerimentosAbertos } = this.props

    return (
      <div>
        <h3>Requerimentos em Aberto</h3>
        <div style={searchStyle}>
          <FontIcon className="material-icons">search</FontIcon>
          <TextField
            name="search"
            hintText="Pesquisar"
            fullWidth={true}
            onChange={this.handleSearch}
            defaultValue={this.state.search}
          />
        </div>
        <div>
          {requerimentosAbertos.fetched && (
            <ul>{this.renderRequerimentos()}</ul>
          )}
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
