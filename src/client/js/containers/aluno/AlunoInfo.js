// @flow

import type { Action, Dispatch } from '../../actions/types/index'
import type {
  Aluno,
  Curso,
  State as DefaultState,
  Store
} from '../../reducers/types/index'
import { Subheader, TextField } from 'material-ui'

import React from 'react'
import { connect } from 'react-redux'
import { requestAluno } from '../../actions/aluno'
import { requestCursos } from '../../actions/curso'

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
  render() {
    const { aluno, curso } = this.props

    const loaded: boolean = aluno.fetched && curso.fetched

    return (
      <div>
        <Subheader>Aluno</Subheader>
        <div>
          {loaded && (
            <div>
              <TextField
                defaultValue={aluno.payload.nome}
                floatingLabelText="Nome"
                fullWidth={true}
                disabled={true}
              />
              <TextField
                defaultValue={aluno.payload.matricula}
                floatingLabelText="Matricula"
                fullWidth={true}
                disabled={true}
              />
              <TextField
                defaultValue={aluno.payload.telefone}
                floatingLabelText="Telefone"
                fullWidth={true}
                disabled={true}
              />
              <TextField
                defaultValue={curso.payload.nome}
                floatingLabelText="Curso"
                fullWidth={true}
                disabled={true}
              />
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
