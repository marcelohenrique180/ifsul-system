import React from 'react'
import {Link} from 'react-router'
import RouterHandler from './RouterHandler'
import AuthorizedContainer from './AuthorizedContainer'

class AlunoMenu extends AuthorizedContainer {

    render(){
        return (
            <div>
                <div className="col-xs-10 col-sm-4 col-lg-2 col-xs-offset-1 col-sm-offset-0">
                    <div className="panel panel-info">
                        <div className="panel-heading">Notificações</div>
                        <div className="panel-body">
                            Sem novas Notificações!
                        </div>
                    </div>
                    <div className="panel panel-default">
                        <div className="panel-heading">Ações</div>
                        <div className="panel-body">
                            <ul className="list-group">
                                <li className="list-group-item"><Link to="/menu/aluno/requerimento">Requerimento</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-xs-12 col-sm-6 col-md-6 col-sm-offset-1 col-md-offset-1">
                    <RouterHandler {...this.props} />
                </div>
            </div>
        )
    }
}

export default AlunoMenu