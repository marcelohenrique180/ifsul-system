// @flow

import * as React from 'react'

import {
  BottomNavigation,
  BottomNavigationItem
} from 'material-ui/BottomNavigation'

import AuthorizedContainer from '../AuthorizedContainer'
import CordRequerimentoAberto from '../requerimento/CordRequerimentoAberto'
import FontIcon from 'material-ui/FontIcon'
import RouterHandler from '../RouterHandler'
import autobind from 'autobind-decorator'
import { gray500 } from 'material-ui/styles/colors'

const NavigationStyle = {
  position: 'fixed',
  bottom: 0
}

type States = {
  selectedIndex: number
}

class CordMenu extends AuthorizedContainer<States> {
  state = {
    selectedIndex: 0
  }
  @autobind
  select(i: number) {
    this.setState({ selectedIndex: i })
  }
  render() {
    const notificationIcon = (
      <FontIcon className="material-icons">notifications</FontIcon>
    )
    const menuIcon = <FontIcon className="material-icons">menu</FontIcon>
    const codeIcon = <FontIcon className="material-icons">code</FontIcon>

    return (
      <div>
        <div className="col-xs-10 col-xs-offset-1 col-sm-4 col-sm-offset-0 col-lg-3">
          <CordRequerimentoAberto {...this.props} />
        </div>
        <div>
          <RouterHandler {...this.props} />
        </div>
        <BottomNavigation
          selectedIndex={this.state.selectedIndex}
          style={NavigationStyle}
        >
          <BottomNavigationItem
            label="Novos"
            icon={notificationIcon}
            onClick={() => this.select(0)}
          />
          <BottomNavigationItem
            label="Fechados"
            icon={menuIcon}
            onClick={() => this.select(1)}
          />
          <BottomNavigationItem
            color={gray500}
            label="Em Progresso"
            icon={codeIcon}
          />
        </BottomNavigation>
      </div>
    )
  }
}

export default CordMenu
