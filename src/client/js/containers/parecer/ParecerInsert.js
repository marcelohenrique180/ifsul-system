// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'
import autobind from 'autobind-decorator'
import { sendParecer } from '../../actions/parecer'
import { getRequerimentosEmAberto } from '../../actions/requerimento'
import { handleChange } from '../../util'
import { areFieldsEmpty } from '../../util'
import FloatInput from '../../components/FloatInput'
import Alerta from '../../components/Alerta'

type Props = Object

type State = Object

class ParecerInsert extends Component<Props, State> {
  constructor(props) {
    super(props)

    this.state = {
      deferido: '',
      parecer: '',
      memorando: '',
      erro: { message: '', erro: false }
    }
    this.handleChange = handleChange.bind(this)
  }

  @autobind
  handleSubmit(e) {
    e.preventDefault()

    const { deferido, parecer, memorando } = this.state
    const notNullFields = [deferido, parecer, memorando]
    const requerimento_link = this.props.requerimento.requerimento._links.self
      .href

    const error = areFieldsEmpty(notNullFields)
    if (error) {
      this.setState({
        erro: {
          erro: true,
          message: 'Algum campo obrigatório não foi preenchido.'
        }
      })
    } else {
      this.setState({ erro: { erro: false } })
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

function mapStateToProps(state) {
  return {
    requerimento: state.requerimento
  }
}

function mapDispatchToProps(dispatch) {
  return {
    sendParecer: parecer => dispatch(sendParecer(parecer)),
    reloadRequerimentoAberto: parecer => reloadRequerimentoAberto(dispatch),
    getRequerimentosEmAberto: () => dispatch(getRequerimentosEmAberto())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ParecerInsert)
