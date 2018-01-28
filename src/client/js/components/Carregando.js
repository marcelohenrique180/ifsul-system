// @flow

import * as React from 'react'

import CircularProgress from 'material-ui/CircularProgress'

const style = {
  progress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  }
}

export default class Carregando extends React.Component<{}> {
  render() {
    return <CircularProgress size={60} thickness={7} style={style.progress} />
  }
}
