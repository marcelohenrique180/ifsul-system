// @flow

import * as React from 'react'

import type { Action, Dispatch } from '../../actions/types/index'
import type {
  State as DefaultState,
  Parecer,
  RequerimentoPage,
  Store,
  Tipo
} from '../../reducers/types/index'
import {
  Table,
  TableBody,
  TableFooter,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table'
import { gray500, green500, red500 } from 'material-ui/styles/colors'

import Carregando from '../../components/Carregando'
import FontIcon from 'material-ui/FontIcon'
import { Link } from 'react-router'
import Paginator from '../../components/Paginator'
import Subheader from 'material-ui/Subheader'
import type { Theme } from '../../components/App'
import autobind from 'autobind-decorator'
import { callApi } from '../../actions/middleware/api'
import { connect } from 'react-redux'
import { getId } from '../../util'
import { getRequerimentoByPage } from '../../actions/requerimento'
import muiThemable from 'material-ui/styles/muiThemeable'
import { requestTipos } from '../../actions/tipo'

const requerimentoApi = 'requerimentos/search/findAllAlunoEndpoint?size=5&'

type StateProps = {
  requerimentos: DefaultState<RequerimentoPage>
}

type DispatchProps = {
  getRequerimentoByPage: string => Promise<Action<RequerimentoPage>>,
  requestTipos: string => Promise<Action<Tipo>>
}

type Props = StateProps &
  DispatchProps & {
    location: Object,
    muiTheme?: Theme
  }

type State = {
  currentPage: number,
  tipos: Array<?Action<Tipo>>,
  pareceres: Array<?Parecer> // TODO Criar Reducer para essa prop
}

@muiThemable()
class AlunoVisualizarRequerimentos extends React.Component<Props, State> {
  state = { currentPage: 0, tipos: [], pareceres: [] }

  constructor(props: Props) {
    super(props)

    this.props
      .getRequerimentoByPage(requerimentoApi + 'page=0')
      .then(this.requestTableContent)
  }

  @autobind
  requestTableContent(response: Action<RequerimentoPage>) {
    if (typeof response.payload === 'undefined') return
    const { requerimentos } = response.payload._embedded
    const tipos: Array<?Action<Tipo>> = []
    const pareceres: Array<?Parecer> = []

    for (let i = 0; i < requerimentos.length; i++) {
      this.props
        .requestTipos(requerimentos[i]._links.tipo.href)
        .then(tipo => {
          tipos[i] = tipo
          this.setState({ tipos })
        })
        .catch(() => {
          tipos[i] = null
          this.setState({ tipos })
        })

      let requerimentoId = requerimentos[i]._links.self.href.match(/\d+$/)
      if (typeof requerimentoId !== 'undefined' && requerimentoId !== null) {
        requerimentoId = requerimentoId[0]
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
            pareceres[i] = null
            this.setState({ pareceres })
          })
      }
    }
  }

  @autobind
  getRequerimentoByPage(page: string) {
    return () => {
      const pageNum = page.match(/page=([0-9])+/)

      if (typeof pageNum !== 'undefined' && pageNum !== null) {
        this.setState({ currentPage: parseInt(pageNum[1]) })

        this.props.getRequerimentoByPage(page).then(this.requestTableContent)
      }
    }
  }

  @autobind
  renderLines() {
    const { requerimentos } = this.props.requerimentos.payload._embedded
    const { tipos, pareceres } = this.state

    return requerimentos.map((requerimento, i) => {
      const tipo = tipos[i] ? tipos[i].payload.tipo : ''
      let parecer = pareceres[i]
      const requerimentoId = getId(requerimento._links.self.href)

      if (typeof parecer !== 'undefined' && parecer !== null) {
        parecer =
          parecer.deferido === true ? (
            <FontIcon className="material-icons" style={{ color: green500 }}>
              done
            </FontIcon>
          ) : (
            <FontIcon className="material-icons" style={{ color: red500 }}>
              not_interested
            </FontIcon>
          )
      } else {
        parecer = (
          <FontIcon className="material-icons" style={{ color: gray500 }}>
            settings_ethernet
          </FontIcon>
        )
      }

      return (
        <TableRow key={i}>
          <TableRowColumn>{tipo}</TableRowColumn>
          <TableRowColumn>{requerimento.requerimento}</TableRowColumn>
          <TableRowColumn>{requerimento.data}</TableRowColumn>
          <TableRowColumn>{parecer}</TableRowColumn>
        </TableRow>
      )
    })
  }

  render() {
    const requerimentosProp = this.props.requerimentos
    let data = <Carregando />

    const primary2Color = this.props.muiTheme
      ? this.props.muiTheme.palette.primary2Color
      : 'black'

    if (requerimentosProp.fetched) {
      const { requerimentos } = requerimentosProp.payload._embedded

      if (requerimentos.length > 0) {
        data = (
          <div>
            <Table>
              <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                <TableRow>
                  <TableHeaderColumn
                    style={{
                      color: primary2Color
                    }}
                  >
                    Tipo
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    style={{
                      color: primary2Color
                    }}
                  >
                    Requerimento
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    style={{
                      color: primary2Color
                    }}
                  >
                    Status
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    style={{
                      color: primary2Color
                    }}
                  >
                    Parecer
                  </TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={false}>
                {this.renderLines()}
              </TableBody>
              <TableFooter adjustForCheckbox={false}>
                <TableRow>
                  <TableRowColumn colSpan="5">
                    <Paginator
                      pageableEntity={this.props.requerimentos.payload}
                      currentPage={this.state.currentPage}
                      location={this.props.location}
                      api={requerimentoApi}
                      onClickHandler={this.getRequerimentoByPage}
                    />
                  </TableRowColumn>
                </TableRow>
              </TableFooter>
            </Table>
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
        <Subheader>Meus Requerimentos</Subheader>
        {data}
      </div>
    )
  }
}

function mapStateToProps(state: Store): StateProps {
  return {
    requerimentos: state.requerimentoPage
  }
}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
  return {
    getRequerimentoByPage: page => dispatch(getRequerimentoByPage(page)),
    requestTipos: url => dispatch(requestTipos(url))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  AlunoVisualizarRequerimentos
)
