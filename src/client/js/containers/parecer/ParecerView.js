// @flow

import * as React from 'react'

import type { State as DefaultState, Parecer } from '../../reducers/types'

import Carregando from '../../components/Carregando'
import FloatInput from '../../components/FloatInput'

type Props = {
  parecer: DefaultState<Parecer>
}

export default class ParecerView extends React.Component<Props> {
  render() {
    const { parecer } = this.props
    if (parecer.hasError)
      return (
        <p style={{ textAlign: 'center' }}>
          Nenhum parecer foi dado até agora.
        </p>
      )
    if (!parecer.fetched) {
      return <Carregando />
    }

    const deferido: string = parecer.deferido ? 'Deferido' : 'Indeferido'

    return (
      <div>
        <h3 style={{ textAlign: 'center' }}>Parecer</h3>
        <div>
          <div>
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
          </div>
        </div>
      </div>
    )
  }
}
