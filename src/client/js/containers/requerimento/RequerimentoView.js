// @flow

import type { Action, Dispatch } from '../../actions/types'
import type {
  State as DefaultState,
  Requerimento,
  Store,
  Tipo
} from '../../reducers/types'
import { Divider, Subheader, TextField } from 'material-ui'

import ParecerInsert from '../../containers/parecer/ParecerInsert'
import React from 'react'
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
        if (typeof requerimento.payload !== 'undefined') {
          this.props.requestTipos(requerimento.payload._links.tipo.href)
        }
      })
  }

  render() {
    const requerimento = this.props.requerimento.payload
    const tipo = this.props.tipo.payload
    const tipoFetched = this.props.tipo.fetched
    const requerimentoFetched = this.props.requerimento.fetched

    return (
      <div>
        <Subheader>Requerimento</Subheader>
        <div>
          {tipoFetched &&
            requerimentoFetched && (
              <div>
                <TextField
                  defaultValue={tipo.tipo}
                  floatingLabelText="Tipo"
                  fullWidth={true}
                  disabled={true}
                />
                <TextField
                  rows={3}
                  floatingLabelText="Requerimento"
                  multiLine={true}
                  defaultValue={requerimento.requerimento}
                  fullWidth={true}
                  disabled={true}
                />
                <TextField
                  rows={3}
                  floatingLabelText="Justificativa"
                  multiLine={true}
                  defaultValue={requerimento.justificativa}
                  fullWidth={true}
                  disabled={true}
                />
                <Divider />
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
