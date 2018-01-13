// @flow

import type { Store, State as DefaultState } from '../../reducers/types'
import type { Dispatch, Action } from '../../actions/types'
import type { ParecerType } from '../../reducers/reducer-parecer'
import type { RequerimentoType } from '../../reducers/reducer-requerimento'

import React from 'react'
import { connect } from 'react-redux'
import FloatInput from '../../components/FloatInput'
import Carregando from '../../components/Carregando'
import { getParecerByRequerimentoId } from '../../actions/parecer'

type DispatchProps = {
  getParecerByRequerimentoId: RequerimentoType => Promise<Action>
}

type StateProps = {
  parecer: DefaultState<ParecerType>,
  requerimento: DefaultState<RequerimentoType>
}

type Props = StateProps & DispatchProps

class ParecerView extends React.Component<Props> {
  constructor(props: Props) {
    super(props)
    const { requerimento } = this.props

    if (requerimento.fetched) {
      this.props.getParecerByRequerimentoId(requerimento.payload)
    }
  }

  render() {
    const { parecer } = this.props

    if (typeof parecer.payload !== 'undefined') {
      parecer.payload.deferido = parecer.payload.deferido
        ? 'Deferido'
        : 'Indeferido'
    }

    return (
      <div>
        <h3 style={{ textAlign: 'center' }}>Parecer</h3>
        <div>
          {parecer.hasError === false ? (
            <div>
              {parecer.fetched === true ? (
                <div>
                  <div className="input-group">
                    <FloatInput
                      name="parecer"
                      type="text"
                      value={parecer.payload.parecer}
                      textLabel="Parecer"
                      readOnly="true"
                    />
                  </div>
                  <div className="input-group">
                    <FloatInput
                      name="deferimento"
                      type="text"
                      value={parecer.payload.deferido}
                      textLabel="Deferimento"
                      readOnly="true"
                    />
                  </div>
                </div>
              ) : (
                <Carregando />
              )}
            </div>
          ) : (
            <div>
              <p style={{ textAlign: 'center' }}>
                Nenhum parecer foi dado até agora.
              </p>
            </div>
          )}
        </div>
      </div>
    )
  }
}

function mapStateToProps(store: Store): StateProps {
  return {
    parecer: store.parecer,
    requerimento: store.requerimento
  }
}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
  return {
    getParecerByRequerimentoId: requerimento =>
      dispatch(getParecerByRequerimentoId(requerimento))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ParecerView)
