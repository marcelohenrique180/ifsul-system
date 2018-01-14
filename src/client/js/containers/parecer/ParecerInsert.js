// @flow

import * as React from 'react'

import type { Action, Dispatch } from '../../actions/types/index'
import type {
  State as DefaultState,
  Parecer,
  Requerimento,
  Store
} from '../../reducers/types/index'

import Alerta from '../../components/Alerta'
import FloatInput from '../../components/FloatInput'
import { areFieldsEmpty } from '../../util'
import autobind from 'autobind-decorator'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { getRequerimentosEmAberto } from '../../actions/requerimento'
import { sendParecer } from '../../actions/parecer'

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
  handleChange(event: SyntheticInputEvent<HTMLButtonElement>) {
    const { value, name } = event.target

    this.setState({ [name]: value })
  }

  @autobind
  handleSubmit(e: SyntheticInputEvent<HTMLInputElement>) {
    e.preventDefault()

    const { deferido, parecer, memorando } = this.state
    const notNullFields = [deferido, parecer, memorando]

    if (typeof this.props.requerimento.payload._links !== 'undefined') {
      const requerimento_link: string = this.props.requerimento.payload._links
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
            deferido,
            parecer,
            memorando,
            requerimento: requerimento_link
          })
          .then(() => {
            this.props.getRequerimentosEmAberto()
          })
        this.props.router.push('/')
      }
    }
  }

  render() {
    const { erro } = this.state

    return (
      <div>
        <h3 className="text-center">Parecer</h3>
        <form className="form-group">
          <div className="form-group">
            <label htmlFor="parecer">Parecer</label>
            <textarea
              name="parecer"
              id="parecer"
              rows="5"
              className="form-control"
              value={this.state.parecer}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group radio-inline-flex">
            <div className="radio-inline">
              <label>
                <input
                  type="radio"
                  name="deferido"
                  value="true"
                  checked={this.state.deferido === 'true'}
                  onChange={this.handleChange}
                />Deferir
              </label>
            </div>
            <div className="radio-inline">
              <label>
                <input
                  type="radio"
                  name="deferido"
                  value="false"
                  checked={this.state.deferido === 'false'}
                  onChange={this.handleChange}
                />Não Deferir
              </label>
            </div>
          </div>
          <div className="input-group">
            <FloatInput
              name="memorando"
              type="text"
              value={this.state.memorando}
              handleChange={this.handleChange}
              textLabel="Nº do Memorando"
            />
          </div>
          <a href="#" target="_blank" className="pull-right">
            Gerar Memorando
          </a>
          <Alerta
            show={erro.erro}
            alertClass="alert alert-danger"
            message={erro.message}
          />
          <div className="input-group text-center">
            <button
              type="submit"
              className="btn btn-custom"
              onClick={this.handleSubmit}
            >
              Enviar
            </button>
          </div>
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
