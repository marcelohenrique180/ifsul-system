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

import Alerta from '../../components/Alerta'
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
  erro: { message: string, erro: boolean }
}

class ParecerInsert extends React.Component<Props, State> {
  static defaultProps = {
    router: browserHistory
  }
  state = {
    deferido: '',
    parecer: '',
    memorando: '',
    erro: { message: '', erro: false }
  }

  @autobind
  handleChange(event: SyntheticInputEvent<HTMLInputElement>) {
    const { value, name } = event.target

    this.setState({ [name]: value })
  }

  @autobind
  handleSubmit(e: SyntheticInputEvent<HTMLInputElement>) {
    e.preventDefault()

    const { deferido, parecer, memorando } = this.state
    const notNullFields = [deferido, parecer, memorando]

    if (typeof this.props.requerimento.payload._links !== 'undefined') {
      const requerimentoLink: string = this.props.requerimento.payload._links
        .self.href

      const error = areFieldsEmpty(notNullFields)
      if (error) {
        this.setState({
          erro: {
            erro: true,
            message: 'Algum campo obrigatório não foi preenchido.'
          }
        })
      } else {
        this.setState({ erro: { message: '', erro: false } })

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
  }

  render() {
    const { erro } = this.state

    return (
      <div>
        <Subheader>Parecer</Subheader>
        <form>
          <TextField
            name="parecer"
            rows={1}
            hintText="Parecer"
            multiLine={true}
            defaultValue={this.state.parecer}
            onChange={this.handleChange}
            fullWidth={true}
          />
          <TextField
            name="memorando"
            defaultValue={this.state.memorando}
            handleChange={this.handleChange}
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
          <Alerta
            show={erro.erro}
            alertClass="alert alert-danger"
            message={erro.message}
          />
          <RaisedButton
            primary={true}
            label="Enviar"
            onClick={this.handleSubmit}
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
