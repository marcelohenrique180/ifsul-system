import React, {Component} from 'react'
import {findField} from '../util'

class ServerError extends Component {

    render(){
        return (
            <div className="alert alert-danger text-center col-xs-8 col-xs-offset-2" role="alert">
                Campo {findField(this.props.error)} já existe
            </div>
        )
    }
}

export default ServerError