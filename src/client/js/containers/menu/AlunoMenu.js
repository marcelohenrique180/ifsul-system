// @flow

import AuthorizedContainer from '../AuthorizedContainer'
import { Link } from 'react-router'
import React from 'react'
import RouterHandler from '../RouterHandler'

class AlunoMenu extends AuthorizedContainer<{}> {
  render() {
    return (
      <div>
        <div>Requerimentos</div>
        <Link to="/menu/aluno/requerimento/solicitar">Solicitar</Link>
        <Link to="/menu/aluno/requerimento/visualizar">Visualizar</Link>
        <RouterHandler {...this.props} />
      </div>
    )
  }
}

export default AlunoMenu
