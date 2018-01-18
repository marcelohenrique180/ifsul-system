// @flow

import type { Action, Dispatch } from '../../actions/types'
import type { State as DefaultState, Store } from '../../reducers/types'
import type { Parecer, Requerimento } from '../../reducers/types/index'

import Carregando from '../../components/Carregando'
import FloatInput from '../../components/FloatInput'
import React from 'react'
import { connect } from 'react-redux'
import { getId } from '../../util'
import { getParecerByRequerimentoId } from '../../actions/parecer'

type DispatchProps = {
  getParecerByRequerimentoId: string => Promise<Action<Requerimento>>
}

type StateProps = {
  parecer: DefaultState<Parecer>
}

type Props = StateProps &
  DispatchProps & { requerimento: DefaultState<Requerimento> }

class ParecerView extends React.Component<Props> {
  constructor(props: Props) {
    super(props)
    const { requerimento } = this.props

    this.props.getParecerByRequerimentoId(
      getId(requerimento.payload._links.self.href)
    )
  }

  render() {
    const { parecer } = this.props

    const deferido: string = parecer.payload.deferido
      ? 'Deferido'
      : 'Indeferido'

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
                      value={deferido}
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
    parecer: store.parecer
  }
}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
  return {
    getParecerByRequerimentoId: requerimento =>
      dispatch(getParecerByRequerimentoId(requerimento))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ParecerView)
