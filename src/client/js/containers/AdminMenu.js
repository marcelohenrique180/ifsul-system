import React from 'react'
import AuthorizedContainer from './AuthorizedContainer'

class AdminMenu extends AuthorizedContainer {

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
                </div>
                <div className="col-xs-12 col-sm-6 col-md-6 col-sm-offset-1 col-md-offset-1">

                </div>
            </div>
        )
    }
}

export default AdminMenu