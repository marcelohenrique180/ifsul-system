// @flow

import React from 'react'

class NaoAutorizado extends React.Component<{
  router: { push: string => void }
}> {
  render() {
    const { router } = this.props

    return (
      <div>
        <div className="col-xs-10 col-xs-offset-1">
          <div className="alert alert-danger text-center" role="alert">
            Acesso Negado!
          </div>
          <button
            className="btn btn-custom center-block"
            onClick={() => router.push('/login')}
          >
            Login
          </button>
        </div>
      </div>
    )
  }
}

export default NaoAutorizado
