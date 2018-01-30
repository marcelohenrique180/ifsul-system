import AuthorizedContainer from '../AuthorizedContainer'
import { Link } from 'react-router'
import React from 'react'
import RouterHandler from '../RouterHandler'

class AlunoMenu extends AuthorizedContainer {
  render() {
    return (
      <div>
        <div>
          <div>
            <div>Requerimentos</div>
            <div>
              <ul>
                <li>
                  <span />
                  <Link to="/menu/aluno/requerimento/solicitar">Solicitar</Link>
                </li>
                <li>
                  <span />
                  <Link to="/menu/aluno/requerimento/visualizar">
                    Visualizar
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div>
          <RouterHandler {...this.props} />
        </div>
      </div>
    )
  }
}

export default AlunoMenu
