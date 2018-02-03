// @flow

import * as React from 'react'

import type { Action, Dispatch } from '../../actions/types/index'
import type { Aluno, Requerimento, Tipo } from '../../reducers/types/index'

import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'
import SelectField from 'material-ui/SelectField'
import type { SendRequerimento } from '../../actions/requerimento'
import Subheader from 'material-ui/Subheader'
import TextField from 'material-ui/TextField'
import { areFieldsEmpty } from '../../util'
import autobind from 'autobind-decorator'
import { connect } from 'react-redux'
import { sendRequerimento } from '../../actions/requerimento'

type DispatchProps = {
  sendRequerimento?: SendRequerimento => Promise<Action<Requerimento>>
}

type Props = {
  tipos: Array<Tipo>,
  aluno: Aluno
} & DispatchProps

type State = {
  tipo: string,
  requerimento: string,
  justificativa: string,
  erro: { erro: boolean, message: string },
  enviado: boolean,
  formComplete: boolean
}

@connect(null, mapDispatchToProps)
class AlunoRequerimento extends React.Component<Props, State> {
  state = {
    tipo: '',
    requerimento: '',
    justificativa: '',
    erro: { erro: false, message: '' },
    enviado: false,
    formComplete: false
  }

  @autobind
  handleSubmit(event: SyntheticInputEvent<HTMLInputElement>) {
    event.preventDefault()

    const { tipo, requerimento, justificativa } = this.state
    const aluno = this.props.aluno._links.aluno.href

    if (this.props.sendRequerimento) {
      this.props
        .sendRequerimento({ tipo, requerimento, justificativa, aluno })
        .then(() => this.setState({ enviado: true }))
    }
  }

  @autobind
  renderTipos() {
    return this.props.tipos.map(tipo => {
      return (
        <MenuItem
          key={tipo._links.self.href}
          value={tipo._links.self.href}
          primaryText={tipo.tipo}
        />
      )
    })
  }

  @autobind
  handleChange(event: SyntheticInputEvent<HTMLInputElement>) {
    const { value, name } = event.target

    const { tipo, requerimento, justificativa } = {
      ...this.state,
      [name]: value
    }
    const error = areFieldsEmpty([tipo, requerimento, justificativa])
    this.setState({ formComplete: !error, [name]: value })
  }

  handleSelectChange = (e: any, i: number, tipo: string) =>
    this.setState({ tipo })

  render() {
    return (
      <div>
        <Subheader>Requerimento</Subheader>
        <SelectField
          floatingLabelText="Tipos"
          value={this.state.tipo}
          onChange={this.handleSelectChange}
        >
          {this.renderTipos()}
        </SelectField>
        <TextField
          name="requerimento"
          rows={1}
          floatingLabelText="Requerimento"
          multiLine={true}
          floatingLabelStyle={{ color: 'rgba(0, 0, 0, 0.57)' }}
          defaultValue={this.state.requerimento}
          onChange={this.handleChange}
          fullWidth={true}
        />
        <TextField
          name="justificativa"
          rows={1}
          floatingLabelText="Justificativa"
          multiLine={true}
          floatingLabelStyle={{ color: 'rgba(0, 0, 0, 0.57)' }}
          defaultValue={this.state.justificativa}
          onChange={this.handleChange}
          fullWidth={true}
        />
        <RaisedButton
          primary={true}
          label="Enviar"
          onClick={this.handleSubmit}
          disabled={!this.state.formComplete}
          style={{
            display: 'block',
            width: '4em',
            margin: '0 auto'
          }}
        />
      </div>
    )
  }
}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
  return {
    sendRequerimento: requerimento => dispatch(sendRequerimento(requerimento))
  }
}

export default AlunoRequerimento
