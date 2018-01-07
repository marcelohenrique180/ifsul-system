import React from 'react'
import RouterHandler from '../containers/RouterHandler'

class MenuConfirmar extends React.Component {
  render () {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3">
            <RouterHandler {...this.props} />
          </div>
        </div>
      </div>
    )
  }
}

export default MenuConfirmar
