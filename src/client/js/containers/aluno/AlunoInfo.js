import React from 'react'
import {connect} from 'react-redux'
import {requestAluno} from '../../actions/aluno'
import {requestCursos} from '../../actions/curso'
import FloatInput from '../../components/FloatInput'

class AlunoInfo extends React.Component {

    constructor(props){
        super(props);

        const {dispatch} = this.props;

        if (this.props.aluno.fetched === false){
            dispatch(requestAluno()).then(
                aluno => dispatch(requestCursos(aluno.response._links.curso.href))
            )
        }
    }

    render(){
        const alunoState = this.props.aluno;
        const aluno = alunoState.aluno;
        const curso = this.props.curso;

        return (
            <div>
                {
                    alunoState.fetched && curso.fetched &&

                    <div>
                        <h3 style={{textAlign: "center"}}>Aluno</h3>
                        <div>
                            <div className="input-group">
                                <FloatInput name="nome" type="text" value={aluno.nome}
                                            textLabel="Nome"
                                            readOnly="true"/>
                            </div>
                            <div className="input-group">
                                <FloatInput name="nome" type="text" value={aluno.matricula}
                                            textLabel="Matricula" readOnly="true"/>
                            </div>
                            <div className="input-group">
                                <FloatInput name="nome" type="text" value={aluno.telefone}
                                            textLabel="Telefone" readOnly="true"/>
                            </div>
                            <div className="input-group">
                                <FloatInput name="nome" type="text" value={curso.cursos.nome}
                                            textLabel="Curso"
                                            readOnly="true"/>
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        aluno: state.aluno,
        curso: state.curso
    };
}

export default connect(mapStateToProps)(AlunoInfo);