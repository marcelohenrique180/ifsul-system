import React from 'react'
import AuthorizedContainer from '../AuthorizedContainer'
import Notificacao from '../notificacao/Notificacao'
import RouterHandler from '../RouterHandler'

class CordMenu extends AuthorizedContainer {

    render(){
        return (
            <div>
                <div className="col-xs-10 col-sm-4 col-lg-2 col-xs-offset-1 col-sm-offset-0">
                    <Notificacao base="/menu/cordcurso" />
                </div>
                <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-sm-offset-1 col-md-offset-1 col-lg-offset-2">
                    <RouterHandler {...this.props} />
                </div>
            </div>
        )
    }
}

export default CordMenu