// @flow

import * as React from 'react'

import {
  BottomNavigation,
  BottomNavigationItem
} from 'material-ui/BottomNavigation'
import {
  gray500,
  green400,
  green500,
  green700,
  lightBlue100,
  lightBlue500,
  lightGreenA200
} from 'material-ui/styles/colors'

import FontIcon from 'material-ui/FontIcon'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Navbar from './Navbar'
import autobind from 'autobind-decorator'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

type States = {
  selectedIndex: number
}

export const muiTheme = getMuiTheme({
  palette: {
    primary1Color: green500,
    primary2Color: green700,
    primary3Color: green400,
    accent1Color: lightGreenA200,
    accent2Color: lightBlue100,
    accent3Color: lightBlue500
  }
})

const NavigationStyle = {
  position: 'fixed',
  bottom: 0
}

export default class App extends React.Component<
  { children: React$Node },
  States
> {
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
      <MuiThemeProvider muiTheme={muiTheme}>
        <div style={{ marginBottom: 56 }}>
          <Navbar />
          {this.props.children}
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
      </MuiThemeProvider>
    )
  }
}
