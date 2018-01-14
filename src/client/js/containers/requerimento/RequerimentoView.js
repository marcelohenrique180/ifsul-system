// @flow

import type { Action, Dispatch } from '../../actions/types'
import type {
  State as DefaultState,
  Requerimento,
  Tipo
} from '../../reducers/types'

import FloatInput from '../../components/FloatInput'
import ParecerInsert from '../../containers/parecer/ParecerInsert'
import React from 'react'
import type { Store } from '../../reducers/types/index'
import { connect } from 'react-redux'
import { getRequerimento } from '../../actions/requerimento'
import { requestTipos } from '../../actions/tipo'

type StateProps = {
  requerimento: DefaultState<Requerimento>,
  tipo: DefaultState<Tipo>
}

type DispatchProps = {
  getRequerimento: string => Promise<Action<Requerimento>>,
  requestTipos: string => Promise<Action<Tipo>>
}

type Props = StateProps & DispatchProps & { requerimentoId: string }

class RequerimentoView extends React.Component<Props> {
  constructor(props: Props) {
    super(props)

    this.props
      .getRequerimento(this.props.requerimentoId)
      .then((requerimento: Action<Requerimento>) => {
        if (typeof requerimento.payload._links !== 'undefined')
          this.props.requestTipos(requerimento.payload._links.tipo.href)
      })
  }

  render() {
    const requerimento = this.props.requerimento.payload
    const tipo = this.props.tipo.payload
    const tipoFetched = this.props.tipo.fetched
    const requerimentoFetched = this.props.requerimento.fetched

    return (
      <div>
        <h3 className="text-center">Requerimento</h3>
        <div>
          {tipoFetched &&
            requerimentoFetched && (
              <div>
                <div className="input-group">
                  <FloatInput
                    name="tipo"
                    type="text"
                    value={tipo.tipo}
                    textLabel="Tipo"
                    readOnly="true"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="requerimento">Requerimento</label>
                  <textarea
                    name="requerimento"
                    id="requerimento"
                    rows="5"
                    className="form-control"
                    value={requerimento.requerimento}
                    readOnly="true"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="justificativa">Justificativa</label>
                  <textarea
                    name="justificativa"
                    id="justificativa"
                    rows="5"
                    className="form-control"
                    value={requerimento.justificativa}
                    readOnly="true"
                  />
                </div>
                <ParecerInsert requerimento={this.props.requerimento} />
              </div>
            )}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state: Store): StateProps {
  return {
    requerimento: state.requerimento,
    tipo: state.tipos
  }
}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
  return {
    getRequerimento: reqId => dispatch(getRequerimento(reqId)),
    requestTipos: endpoint => dispatch(requestTipos(endpoint))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RequerimentoView)
