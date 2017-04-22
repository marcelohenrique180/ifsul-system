import React from 'react'
import {Link} from 'react-router'
import RouterHandler from '../RouterHandler'
import AuthorizedContainer from '../AuthorizedContainer'

class AlunoMenu extends AuthorizedContainer {

    render(){
        return (
            <div>
                <div className="col-xs-10 col-sm-4 col-lg-2 col-xs-offset-1 col-sm-offset-0">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            Requerimentos
                        </div>
                        <div className="panel-body side-menu">
                            <ul className="list-group">
                                <li className="list-group-item side-item">
                                    <span className="glyphicon glyphicon glyphicon-plus" />
                                    <Link to="/menu/aluno/requerimento/solicitar">
                                        Solicitar
                                    </Link>
                                </li>
                                <li className="list-group-item side-item">
                                    <span className="glyphicon glyphicon glyphicon-search" />
                                    <Link to="/menu/aluno/requerimento">
                                        Visualizar
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-sm-offset-1 col-md-offset-1 col-lg-offset-2">
                    <RouterHandler {...this.props} />
                </div>
            </div>
        )
    }
}

export default AlunoMenu