// @flow

import type { Action, Dispatch } from '../../actions/types/index'
import type {
  Aluno,
  State as DefaultState,
  Requerimento,
  RequerimentoAberto,
  Store,
  Tipo
} from '../../reducers/types/index'
import { List, ListItem } from 'material-ui/List'

import FontIcon from 'material-ui/FontIcon'
import React from 'react'
import Subheader from 'material-ui/Subheader'
import TextField from 'material-ui/TextField'
import autobind from 'autobind-decorator'
import { connect } from 'react-redux'
import { getAluno } from '../../actions/aluno'
import { getId } from '../../util'
import { getRequerimentosEmAberto } from '../../actions/requerimento'
import { requestTipos } from '../../actions/tipo'

const searchStyle = {
  display: 'flex',
  alignItems: 'center'
}

type StateProps = {
  requerimentosAbertos: DefaultState<RequerimentoAberto>
}

type DispatchProps = {
  requestTipos: string => Promise<Action<Tipo>>,
  getRequerimentosEmAberto: () => Promise<Action<RequerimentoAberto>>,
  getAluno: string => Promise<Action<Aluno>>,
  loadRequerimento: ({
    push: string => void,
    id: string
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
  requerimentos: Array<{
    requerimento: Requerimento,
    aluno: Aluno,
    requerimento_id: string,
    search: string,
    tipo: Tipo
  }>,
  filteredRequerimentos: Array<{
    requerimento: Requerimento,
    aluno: Aluno,
    requerimento_id: string,
    search: string,
    tipo: Tipo
  }>
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
                this.props
                  .requestTipos(requerimento._links.tipo.href)
                  .then(tipo => {
                    if (
                      typeof alunoResponse.payload !== 'undefined' &&
                      typeof tipo.payload !== 'undefined'
                    ) {
                      this.setState({
                        requerimentos: this.state.requerimentos.concat([
                          {
                            search:
                              getId(requerimento._links.self.href) +
                              ' ' +
                              alunoResponse.payload.nome +
                              ' ' +
                              alunoResponse.payload.matricula +
                              ' ' +
                              requerimento.data +
                              ' ' +
                              tipo.payload.tipo,
                            requerimento: requerimento,
                            aluno: alunoResponse.payload,
                            requerimento_id: getId(
                              requerimento._links.self.href
                            ),
                            tipo: tipo.payload
                          }
                        ])
                      })
                    }
                    this.setState({
                      filteredRequerimentos: this.state.requerimentos
                    })
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
          id
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
      const icon = (
        <FontIcon className="material-icons" style={{ margin: '30px 12px' }}>
          description
        </FontIcon>
      )
      return (
        <ListItem
          key={i}
          primaryText={reqAberto.aluno.nome}
          secondaryText={
            <p>
              {reqAberto.requerimento.data} - {reqAberto.tipo.tipo}
              <br />
              {reqAberto.requerimento.requerimento}
            </p>
          }
          secondaryTextLines={2}
          leftIcon={icon}
          onClick={this.onItemClick(reqAberto.requerimento_id)}
        />
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
        <Subheader>Requerimentos em Aberto</Subheader>
        <div style={searchStyle}>
          <FontIcon className="material-icons" style={{ margin: '.5em' }}>
            search
          </FontIcon>
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
            <List>{this.renderRequerimentos()}</List>
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
    requestTipos: (url: string) => dispatch(requestTipos(url)),
    getRequerimentosEmAberto: () => dispatch(getRequerimentosEmAberto()),
    getAluno: url => dispatch(getAluno(url)),
    loadRequerimento: ({ push, id }) => {
      push('/menu/cordcurso/requerimento/' + id)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  CordRequerimentoAberto
)
