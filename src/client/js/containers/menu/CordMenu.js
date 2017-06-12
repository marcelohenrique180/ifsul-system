import React from 'react'
import AuthorizedContainer from '../AuthorizedContainer'
import CordRequerimentoAberto from '../requerimento/CordRequerimentoAberto'
import RouterHandler from '../RouterHandler'

class CordMenu extends AuthorizedContainer {

    render(){
        let menuSize = "col-xs-12 col-sm-6 col-sm-offset-1 col-md-6 col-md-offset-1 col-lg-6 col-lg-offset-1";

        if (this.props.routes[3]){
            const {path} = this.props.routes[3];

            switch (path){
                case "requerimento/visualizar":
                    menuSize = "col-xs-12 col-sm-6 col-sm-offset-1 col-md-6 col-md-offset-1 col-lg-7";
                    break;
            }
        }

        return (
            <div>
                <div className="col-xs-10 col-xs-offset-1 col-sm-4 col-sm-offset-0 col-lg-3">
                    <CordRequerimentoAberto {...this.props} />
                </div>
                <div className={menuSize}>
                    <RouterHandler {...this.props} />
                </div>
            </div>
        )
    }
}

export default CordMenu