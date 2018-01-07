import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {requestNotificacao} from '../../actions/notificacao'

import {getRequerimento} from '../../actions/requerimento'
import {requestTipos} from '../../actions/tipo'
import {getAluno} from '../../actions/aluno'
import {requestCursos} from '../../actions/curso'

require('../../../scss/notificacoes.scss')

class Notificacao extends React.Component {
  constructor (props) {
    super(props)
    this.props.dispatch(requestNotificacao())
    this.update = this.update.bind(this)
  }

  update (locale) {
    return () => {
      const {dispatch} = this.props
      const regex = /menu\/[a-z]+\/requerimento\/([0-9]+)/
      const match = regex.exec(locale)

      if (match) {
        if (match[1]) {
          dispatch(getRequerimento(match[1])).then(
            requerimento => {
              dispatch(requestTipos(requerimento.response._links.tipo.href))
              dispatch(getAluno(requerimento.response._links.aluno.href)).then(
                aluno => {
                  dispatch(requestCursos(aluno.response._links.curso.href))
                }
              )
            }
          )
        }
      }
    }
  }

  render () {
    const {notificacao, base} = this.props
    let mensagem = ''

    if (notificacao.isFetching) {
      mensagem = <div style={{textAlign: 'center'}}>Carregando...</div>
    } else if (notificacao.fetched) {
      const todasNotificacoes = notificacao.notificacao.notificacoes
      if (todasNotificacoes.length == 0) {
        mensagem = 'Sem novas Notificações!'
      } else {
        mensagem = todasNotificacoes.map(notificacao => {
          return (
            <Link to={base + notificacao.link} key={todasNotificacoes.indexOf(notificacao)}>
              <li
                onClick={this.update(base + notificacao.link)}
                className="list-group-item"
                style={{backgroundColor: notificacao.color}}>
                {notificacao.mensagem}
              </li>
            </Link>
          )
        })
      }
    } else if (notificacao.error) {
      mensagem =
                <div className="text-center">
                  <button className="btn btn-custom "
                    onClick={() => this.props.dispatch(requestNotificacao())}>Recarregar
                  </button>
                </div>
    }

    return (
      <div>
        <div className="panel panel-info">
          <div className="panel-heading">Notificações</div>
          <div className="panel-body">
            { mensagem }
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    notificacao: state.notificacao
  }
}

export default connect(mapStateToProps)(Notificacao)
