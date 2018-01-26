// @flow

import * as React from 'react'

import type { Action, Dispatch } from '../../actions/types/index'
import type {
  State as DefaultState,
  Parecer,
  Requerimento,
  Store
} from '../../reducers/types/index'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'

import RaisedButton from 'material-ui/RaisedButton'
import Subheader from 'material-ui/Subheader'
import TextField from 'material-ui/TextField'
import { areFieldsEmpty } from '../../util'
import autobind from 'autobind-decorator'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { getRequerimentosEmAberto } from '../../actions/requerimento'
import { sendParecer } from '../../actions/parecer'

const style = {
  radioButton: {
    marginBottom: 16
  }
}

type StateProps = {
  requerimento: DefaultState<Requerimento>
}

type DispatchProps = {
  sendParecer: Parecer => Promise<Action<Parecer>>,
  getRequerimentosEmAberto: void => Promise<Action<Requerimento>>
}

type Props = StateProps & DispatchProps & { router: { push: string => void } }

type State = {
  deferido: string,
  parecer: string,
  memorando: string,
  formComplete: boolean
}

class ParecerInsert extends React.Component<Props, State> {
  static defaultProps = {
    router: browserHistory
  }
  state = {
    deferido: '',
    parecer: '',
    memorando: '',
    formComplete: false
  }

  @autobind
  handleChange(event: SyntheticInputEvent<HTMLInputElement>) {
    const { value, name } = event.target

    const { deferido, parecer, memorando } = { ...this.state, [name]: value }
    const notNullFields = [deferido, parecer, memorando]
    const error = areFieldsEmpty(notNullFields)
    if (!error) {
      this.setState({ formComplete: true, [name]: value })
    } else {
      this.setState({ formComplete: false, [name]: value })
    }
  }

  @autobind
  handleSubmit(e: SyntheticInputEvent<HTMLInputElement>) {
    e.preventDefault()

    if (typeof this.props.requerimento.payload._links !== 'undefined') {
      const requerimentoLink: string = this.props.requerimento.payload._links
        .self.href

      const { deferido, parecer, memorando } = this.state

      this.props
        .sendParecer({
          deferido: deferido === 'true',
          parecer,
          memorando,
          requerimento: requerimentoLink
        })
        .then(() => {
          this.props.getRequerimentosEmAberto()
        })
      this.props.router.push('/menu/cordcurso') // TODO pegar caminho correto
    }
  }

  render() {
    return (
      <div>
        <Subheader>Parecer</Subheader>
        <form>
          <TextField
            name="parecer"
            rows={1}
            floatingLabelText="Parecer"
            multiLine={true}
            defaultValue={this.state.parecer}
            onChange={this.handleChange}
            fullWidth={true}
          />
          <TextField
            name="memorando"
            defaultValue={this.state.memorando}
            onChange={this.handleChange}
            floatingLabelText="Nº do Memorando"
            fullWidth={true}
          />
          <a href="#" target="_blank" style={{ float: 'right' }}>
            Gerar Memorando
          </a>
          <RadioButtonGroup name="deferido">
            <RadioButton
              value="true"
              label="Deferir"
              onClick={this.handleChange}
              style={style.radioButton}
            />
            <RadioButton
              value="false"
              onClick={this.handleChange}
              label="Não Deferir"
              style={style.radioButton}
            />
          </RadioButtonGroup>
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
        </form>
      </div>
    )
  }
}

function mapStateToProps(store: Store): StateProps {
  return {
    requerimento: store.requerimento
  }
}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
  return {
    sendParecer: (parecer: Parecer) => dispatch(sendParecer(parecer)),
    getRequerimentosEmAberto: () => dispatch(getRequerimentosEmAberto())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ParecerInsert)
