// @flow

import * as React from 'react'

import {
  BottomNavigation,
  BottomNavigationItem
} from 'material-ui/BottomNavigation'

import AuthorizedContainer from '../AuthorizedContainer'
import FontIcon from 'material-ui/FontIcon'
import RouterHandler from '../RouterHandler'
import autobind from 'autobind-decorator'
import { browserHistory } from 'react-router'
import { gray500 } from 'material-ui/styles/colors'
import { indexRoute } from '../../util'

const NavigationStyle = {
  position: 'fixed',
  bottom: 0
}

type States = {
  selectedIndex: number,
  history: Array<string>
}

class CordMenu extends AuthorizedContainer<States> {
  state = {
    selectedIndex: 0,
    history: [
      `${indexRoute()}/requerimento/abertos`,
      `${indexRoute()}/requerimento/visualizar`
    ]
  }

  componentDidMount() {
    this.locate(window.location.pathname)
  }

  @autobind
  locate(path: string) {
    this.setState({ selectedIndex: this.state.history.indexOf(path) })
  }

  @autobind
  select(i: number) {
    browserHistory.push(this.state.history[i])
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
        <div style={{ maxWidth: 525, margin: '0 auto' }}>
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
            label="Todos"
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
