import React from 'react'
import {connect} from 'react-redux'
import FloatInput from '../../components/FloatInput'
import {getRequerimento} from '../../actions/requerimento'
import {requestTipos} from '../../actions/tipo'
import {getAluno} from '../../actions/aluno'
import {requestCursos} from '../../actions/curso'
import {handleChange} from '../../util'

require('../../../scss/panel-ifsul.scss');

class CordRequerimento extends React.Component {

    constructor(props){
        super(props);
        const {dispatch} = this.props;
        this.state = {deferido: "naodeferido", requerimentoId: this.props.params["id"]};

        if (this.props.requerimento.fetched === false && this.props.requerimento.isFetching === false){
            dispatch(getRequerimento(this.state.requerimentoId)).then(
                requerimento => {
                    dispatch(requestTipos(requerimento.response._links.tipo.href));
                    dispatch(getAluno(requerimento.response._links.aluno.href)).then(
                        aluno => {
                            dispatch(requestCursos(aluno.response._links.curso.href))
                        }
                    );
                }
            );
        }

        this.handleChange = handleChange.bind(this);
    }

    handleChange(event){}

    render(){
        const alunoProp = this.props.aluno;
        const requerimentoProp = this.props.requerimento;
        const tipoProp = this.props.tipo;
        const cursoProp = this.props.curso;

        const aluno = alunoProp.aluno;
        const curso = cursoProp.cursos;
        const tipo = tipoProp.tipo;
        const requerimento = requerimentoProp.requerimento;

        return (
            <div>
                <div className="panel panel-ifsul">
                    <div className="panel-heading text-center">
                        <h3 className="panel-title">
                            Requerimento
                        </h3>
                    </div>
                    <div className="panel-body">
                        <div className="container-fluid">
                            <div className="row">
                                {
                                    !requerimentoProp.isFetching && !alunoProp.isFetching && !tipoProp.isFetching && !cursoProp.isFetching ?
                                        <div className="form-group col-centered">
                                            <h3 style={{textAlign: "center"}}>Aluno</h3>
                                            <div>
                                                <div className="input-group">
                                                    <FloatInput name="nome" type="text" value={aluno.nome}
                                                                textLabel="Nome"
                                                                readOnly="true"/>
                                                </div>
                                                <div className="input-group">
                                                    <FloatInput name="matricula" type="text" value={aluno.matricula}
                                                                textLabel="Matricula"
                                                                readOnly="true"/>
                                                </div>
                                                <div className="input-group">
                                                    <FloatInput name="telefone" type="text" value={aluno.telefone}
                                                                textLabel="Telefone"
                                                                readOnly="true"/>
                                                </div>
                                                <div className="input-group">
                                                    <FloatInput name="curso" type="text" value={curso.nome}
                                                                textLabel="Curso"
                                                                readOnly="true"/>
                                                </div>
                                            </div>
                                            <h3 style={{textAlign: "center"}}>Requerimento</h3>
                                            <div className="form-group">
                                                <div className="input-group">
                                                    <FloatInput name="tipo" type="text" value={tipo.tipo}
                                                                textLabel="Tipo"
                                                                readOnly="true"/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="requerimento">Requerimento</label>
                                                    <textarea name="requerimento" id="requerimento" rows="5"
                                                              className="form-control" value={requerimento.requerimento}
                                                              readOnly="readOnly"/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="justificativa">Justificativa</label>
                                                    <textarea name="justificativa" id="justificativa" rows="5"
                                                              className="form-control" value={requerimento.justificativa}
                                                              readOnly="readOnly"/>
                                                </div>
                                            </div>
                                            <h3 style={{textAlign: "center"}}>Parecer</h3>
                                            <div className="form-group">
                                                <div className="radio">
                                                    <label>
                                                        <input type="radio" name="deferido" value="deferido"
                                                                checked={this.state.deferido === "deferido"}
                                                                onChange={this.handleChange}/>Deferir
                                                    </label>
                                                </div>
                                                <div className="radio">
                                                    <label>
                                                        <input type="radio" name="deferido" value="naodeferido"
                                                                checked={this.state.deferido === "naodeferido"}
                                                                onChange={this.handleChange}/>Não Deferir
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    :
                                        <img src="img/loading-big.gif" className="center-block"/>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        requerimento: state.requerimento,
        aluno: state.aluno,
        tipo: state.tipos,
        curso: state.curso
    }
}

export default connect(mapStateToProps)(CordRequerimento);