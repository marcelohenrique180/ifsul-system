// @flow

import * as React from 'react'

import type { State as DefaultState, Parecer } from '../../reducers/types'
import { Subheader, TextField } from 'material-ui'

import Carregando from '../../components/Carregando'
import FloatInput from '../../components/FloatInput'

type Props = {
  parecer: DefaultState<Parecer>
}

export default class ParecerView extends React.Component<Props> {
  render() {
    const { parecer } = this.props
    if (parecer.hasError) {
      return (
        <p style={{ textAlign: 'center' }}>
          Nenhum parecer foi dado até agora.
        </p>
      )
    } else if (!parecer.fetched) {
      return <Carregando />
    }

    const deferido: string = parecer.deferido ? 'Deferido' : 'Indeferido'

    return (
      <div>
        <Subheader>Parecer</Subheader>
        <TextField
          defaultValue={parecer.payload.parecer}
          floatingLabelText="Parecer"
          fullWidth={true}
          disabled={true}
        />
        <TextField
          value={deferido}
          floatingLabelText="Deferimento"
          fullWidth={true}
          disabled={true}
        />
      </div>
    )
  }
}
