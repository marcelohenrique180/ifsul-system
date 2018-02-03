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

import Carregando from '../../components/Carregando'
import { Link } from 'react-router'
import Paginator from '../../components/Paginator'
import autobind from 'autobind-decorator'
import { callApi } from '../../actions/middleware/api'
import { connect } from 'react-redux'
import { getId } from '../../util'
import { getRequerimentoByPage } from '../../actions/requerimento'
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
    location: Object
  }

type State = {
  currentPage: number,
  tipos: Array<?Action<Tipo>>,
  pareceres: Array<?Parecer> // TODO Criar Reducer para essa prop
}

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

    return (
      <tbody>
        {requerimentos.map((requerimento, i) => {
          const tipo = tipos[i]
          const parecer = pareceres[i]
          const requerimentoId = getId(requerimento._links.self.href)

          return (
            <tr key={i}>
              <td>
                {typeof tipo !== 'undefined' && tipo !== null ? (
                  <Link
                    to={'/menu/aluno/requerimento/visualizar/' + requerimentoId}
                  >
                    {tipo.payload !== null &&
                    typeof tipo.payload !== 'undefined'
                      ? tipo.payload.tipo
                      : ''}
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
                {parecer === null || typeof parecer === 'undefined' ? (
                  <span>&nbsp;</span>
                ) : (
                  parecer.parecer
                )}
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
