import { connect } from 'react-redux'
import React from 'react'
import FloatInput from '../../components/FloatInput'

class AlunoInfo extends React.Component {
  render () {
    const { aluno, curso } = this.props

    return (
      <div>
        <h3 className="text-center">Aluno</h3>
        <div>
          {
            aluno.fetched && curso.fetched &&
            <div>
              <div className="input-group">
                <FloatInput name="nome" type="text" value={aluno.aluno.nome}
                  textLabel="Nome"
                  readOnly="true" />
              </div>
              <div className="input-group">
                <FloatInput name="nome" type="text" value={aluno.aluno.matricula}
                  textLabel="Matricula" readOnly="true" />
              </div>
              <div className="input-group">
                <FloatInput name="nome" type="text" value={aluno.aluno.telefone}
                  textLabel="Telefone" readOnly="true" />
              </div>
              <div className="input-group">
                <FloatInput name="nome" type="text" value={curso.cursos.nome}
                  textLabel="Curso"
                  readOnly="true" />
              </div>
            </div>
          }
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    aluno: state.aluno,
    curso: state.curso
  }
}

export default connect(mapStateToProps)(AlunoInfo)
