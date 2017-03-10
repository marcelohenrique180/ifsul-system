import React from 'react'
import AuthorizedContainer from '../AuthorizedContainer'
import Notificacao from'../notificacao/Notificacao'

class CordMenu extends AuthorizedContainer {

    render(){
        return (
            <div>
                <div className="col-xs-10 col-sm-4 col-lg-2 col-xs-offset-1 col-sm-offset-0">
                    <Notificacao />
                </div>
                <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-sm-offset-1 col-md-offset-1 col-lg-offset-2">

                </div>
            </div>
        )
    }
}

export default CordMenu