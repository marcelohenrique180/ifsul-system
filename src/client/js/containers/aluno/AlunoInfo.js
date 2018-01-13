// @flow

import { connect } from 'react-redux'

import type { Store, State } from '../../reducers/types/'

import React from 'react'
import FloatInput from '../../components/FloatInput'

class AlunoInfo extends React.Component<Store> {
  render() {
    const { aluno, curso } = this.props

    const loaded: boolean = aluno.fetched && curso.fetched

    return (
      <div>
        <h3 className="text-center">Aluno</h3>
        <div>
          {loaded && (
            <div>
              <div className="input-group">
                <FloatInput
                  name="nome"
                  type="text"
                  value={aluno.payload.nome}
                  textLabel="Nome"
                  readOnly="true"
                />
              </div>
              <div className="input-group">
                <FloatInput
                  name="nome"
                  type="text"
                  value={aluno.payload.matricula}
                  textLabel="Matricula"
                  readOnly="true"
                />
              </div>
              <div className="input-group">
                <FloatInput
                  name="nome"
                  type="text"
                  value={aluno.payload.telefone}
                  textLabel="Telefone"
                  readOnly="true"
                />
              </div>
              <div className="input-group">
                <FloatInput
                  name="nome"
                  type="text"
                  value={curso.payload.nome}
                  textLabel="Curso"
                  readOnly="true"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
}

function mapStateToProps(store: Store): Store {
  return {
    aluno: store.aluno,
    curso: store.curso
  }
}

export default connect(mapStateToProps)(AlunoInfo)
