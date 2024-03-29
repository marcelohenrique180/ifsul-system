// @flow

import * as React from 'react'

type Props = {
  router: {
    push: Function
  },
  route: {
    authorize: Array<string>
  }
}

class AuthorizedContainer<States> extends React.Component<Props, States> {
  componentWillMount() {
    const { authorize } = this.props.route
    const { router } = this.props

    const role = localStorage.getItem('role')

    if (typeof role === 'undefined' || authorize.indexOf(role) === -1) {
      router.push('/nao-autorizado')
    }
  }
}

export default AuthorizedContainer
