// @flow

import React from 'react'
import { connect } from 'react-redux'
import FloatInput from '../../components/FloatInput'

type Props = {
  requerimento: Object,
  tipo: Object
}

class RequerimentoView extends React.Component<Props> {
  render() {
    const { requerimento } = this.props.requerimento
    const { tipo } = this.props.tipo
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
              </div>
            )}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    requerimento: state.requerimento,
    tipo: state.tipos
  }
}

export default connect(mapStateToProps)(RequerimentoView)
