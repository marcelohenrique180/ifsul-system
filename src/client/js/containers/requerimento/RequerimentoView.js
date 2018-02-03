// @flow

import * as React from 'react'

import type { Requerimento, Tipo } from '../../reducers/types'
import { Subheader, TextField } from 'material-ui'

type Props = {
  requerimento: Requerimento,
  tipo: Tipo
}

class RequerimentoView extends React.Component<Props> {
  render() {
    const { requerimento, tipo } = this.props

    return (
      <section>
        <Subheader>Requerimento</Subheader>
        <TextField
          defaultValue={tipo.tipo}
          floatingLabelText="Tipo"
          fullWidth={true}
          disabled={true}
        />
        <TextField
          rows={1}
          floatingLabelText="Requerimento"
          multiLine={true}
          defaultValue={requerimento.requerimento}
          fullWidth={true}
          disabled={true}
        />
        <TextField
          rows={1}
          floatingLabelText="Justificativa"
          multiLine={true}
          defaultValue={requerimento.justificativa}
          fullWidth={true}
          disabled={true}
        />
      </section>
    )
  }
}

export default RequerimentoView
