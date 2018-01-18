import React from 'react'
import RouterHandler from '../RouterHandler'

class Menu extends React.Component {
  render () {
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
