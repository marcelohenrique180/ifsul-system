// @flow

import * as React from 'react'

import type { Action, Dispatch } from '../../actions/types'
import type {
  State as DefaultState,
  Matricula,
  Store
} from '../../reducers/types'

import Alerta from '../../components/Alerta'
import Carregando from '../../components/Carregando'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import Snackbar from 'material-ui/Snackbar'
import TextField from 'material-ui/TextField'
import autobind from 'autobind-decorator'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { novaMatricula } from '../../actions/matricula'
import { sendAlunoMatricula } from '../../actions/aluno'

const styles = {
  height: '100%',
  display: 'grid',
  gridTemplateRows: '1fr 1fr auto 2fr'
}

const voltarContainerStyle = {
  display: 'grid',
  gridTemplateRows: 'repeat(3, 1fr)',
  gridTemplateColumns: 'repeat(3, 1fr)'
}

const voltarStyle = {
  gridRowStart: 3,
  gridColumnStart: 1,
  margin: 'auto'
}

type StateProps = {
  matricula: DefaultState<Matricula>
}

type DispatchProps = {
  sendAlunoMatricula: (matricula: string) => Promise<Action<Matricula>>,
  novaMatricula: () => Action<Matricula> | Promise<Action<Matricula>>
}

type Props = StateProps &
  DispatchProps & {
    toggleSnackBar: string => void
  }

type State = {
  alert: boolean,
  matricula: string,
  formError: {
    [string]: boolean
  }
}

class AlunoCadastro extends React.Component<Props, State> {
  state = {
    alert: false,
    matricula: '',
    formError: { matricula: false }
  }

  @autobind
  handleChangeForm(event: SyntheticInputEvent<HTMLInputElement>) {
    const { name, value } = event.target

    this.setState({
      formError: { [name]: false },
      [name]: value
    })
  }

  @autobind
  novaMatricula() {
    this.props.novaMatricula()
    this.setState({ matricula: '' })
  }

  @autobind
  handleClickMatricula(e: SyntheticEvent<HTMLButtonElement>) {
    e.preventDefault()
    const { matricula } = this.state
    if (matricula === '') {
      this.setState({ formError: { matricula: true } })
    } else {
      this.setState({ formError: { matricula: false } })
      this.props.sendAlunoMatricula(matricula).then(matricula => {
        if (typeof matricula.payload.matricula !== 'undefined') {
          this.props.toggleSnackBar('Aguarde o e-mail de confirmação')
          browserHistory.push('/login')
        }
      })
    }
  }

  render() {
    const matriculaRequest = this.props.matricula
    const { matricula, formError } = this.state
    const { hasError, error } = this.props.matricula

    return (
      <form onSubmit={this.handleClickMatricula} style={styles}>
        <h1>Cadastro</h1>
        <TextField
          name="matricula"
          defaultValue={matricula}
          floatingLabelText="Insira sua matrícula"
          onChange={this.handleChangeForm}
          errorText={hasError ? error.message : ''}
        />
        <RaisedButton primary={true} label="Enviar" type="submit" />
        <div style={voltarContainerStyle}>
          <FlatButton
            primary={true}
            label="Voltar"
            style={voltarStyle}
            onClick={() => {
              browserHistory.goBack()
            }}
          />
        </div>
      </form>
    )
  }
}

function mapStateToProps(state: Store): StateProps {
  return {
    matricula: state.matricula
  }
}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
  return {
    sendAlunoMatricula: (matricula: string) =>
      dispatch(sendAlunoMatricula(matricula)),
    novaMatricula: () => dispatch(novaMatricula())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AlunoCadastro)
