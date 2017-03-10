import React from 'react'
import {connect} from 'react-redux'
import {requestNotificacao} from '../../actions/notificacao'

class Notificacao extends React.Component{
    constructor(props){
        super(props);

        this.props.dispatch(requestNotificacao())
    }

    render(){
        const notificacao = this.props.notificacao;
        let mensagem = "";

        if (notificacao.isFetching){
            mensagem = <div style={{textAlign: "center"}}>Carregando...</div>
        }else if (notificacao.fetched){
            const todasNotificacoes = notificacao.notificacao.notificacoes;
            if (todasNotificacoes.lenght == 0) {
                mensagem = "Sem novas Notificações!"
            }else {
                mensagem = todasNotificacoes.map(singleNotificacao => {
                    return  <li key={todasNotificacoes.indexOf(singleNotificacao)} className="list-group-item">{singleNotificacao.mensagem}</li>
                })
            }
        }else if (notificacao.error){
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

function mapStateToProps(state) {
    return {
        notificacao: state.notificacao
    }
}

export default connect(mapStateToProps)(Notificacao)