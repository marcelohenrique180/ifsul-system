// @flow

import type { Action, Dispatch } from '../../actions/types/index'
import type { Aluno, Curso } from '../../reducers/types/index'
import type { State as DefaultState, Store } from '../../reducers/types/'

import { requestCursos } from '../../actions/curso'
import FloatInput from '../../components/FloatInput'
import React from 'react'
import { connect } from 'react-redux'
import { requestAluno } from '../../actions/aluno'

type StateProps = {
  aluno: DefaultState<Aluno>,
  curso: DefaultState<Curso>
}

type DispatchProps = {
  requestAluno: void => Promise<Action<Aluno>>,
  requestCursos: string => Promise<Action<Curso>>
}

type Props = StateProps & DispatchProps

class AlunoInfo extends React.Component<Props> {
  constructor(props: Props) {
    super(props)

    this.props.requestAluno().then((aluno: Action<Aluno>) => {
      if (typeof aluno.payload._links !== 'undefined')
        this.props.requestCursos(aluno.payload._links.curso.href)
    })
  }

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

function mapStateToProps(store: Store): StateProps {
  return {
    aluno: store.aluno,
    curso: store.curso
  }
}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
  return {
    requestAluno: () => dispatch(requestAluno()),
    requestCursos: endpoint => dispatch(requestCursos(endpoint))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AlunoInfo)
