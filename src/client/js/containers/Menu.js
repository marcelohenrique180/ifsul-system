import React from 'react'
import AuthorizedContainer from './AuthorizedContainer'
import RouterHandler from './RouterHandler'

class Menu extends AuthorizedContainer {
    render(){
        return (
            <div>
                <div id="main-menu">
                    <RouterHandler {...this.props} />
                </div>
            </div>
        )
    }
}

export default Menu