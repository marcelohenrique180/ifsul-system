import React from 'react'
import {connect} from 'react-redux'
import {requestAluno} from '../../actions/aluno'
import {requestTipos} from '../../actions/tipo'
import FloatInput from '../../components/FloatInput'
import {handleChange} from '../../util'
import {areFieldsEmpty} from '../../util'
import {requestCursos} from '../../actions/curso'
import {sendRequeirmento} from '../../actions/requerimento'
import Alerta from '../../components/Alerta'

require('../../../scss/panel-ifsul.scss');

const defaultState = {tipo: "", requerimento: "", justificativa: "", erro: {erro: false, message: ""}, enviado: false};

class AlunoRequerimento extends React.Component {

    constructor(props){
        super(props);
        this.state = defaultState;
        const {dispatch} = this.props;

        dispatch(requestTipos());

        if (this.props.aluno.fetched === false){
            dispatch(requestAluno()).then(
                aluno => dispatch(requestCursos(aluno.response._links.curso.href))
            )
        }

        this.handleChange = handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event){}

    renderTipos(){
        const {tipos} = this.props.tipos.tipo;

        if (tipos){
            return tipos.map((tipo) => {
                return (
                    <option key={tipo._links.self.href} value={tipo._links.self.href}>{tipo.tipo}</option>
                );
            });
        }
        return "";
    }

    handleSubmit(e){
        const {tipo, requerimento, justificativa} = this.state;
        const notNullFields = [tipo, requerimento, justificativa];
        const aluno = this.props.aluno.aluno._links.aluno.href;

        const error = areFieldsEmpty(notNullFields);
        if (error){
            this.setState({erro: {erro: true, message: "Algum campo obrigatório não foi preenchido."}});
        }else {
            this.setState({erro: {erro: false}});
            this.props.dispatch(sendRequeirmento({tipo, requerimento, justificativa, aluno}))
                .then(this.setState({enviado: true}))
        }
        e.preventDefault();
    }

    render() {
        const alunoState = this.props.aluno;
        const aluno = alunoState.aluno;
        const curso = this.props.curso;
        const tiposState = this.props.tipos;
        const requerimentoProp = this.props.requerimento;

        const {tipo, requerimento, justificativa, erro, enviado} = this.state;

        return (
            <div>
                <div className="panel panel-ifsul">
                    <div className="panel-heading text-center">
                        <h3 className="panel-title">
                            Criar Requerimento
                        </h3>
                    </div>
                    <div className="panel-body">
                        {
                            enviado ?
                                <div>
                                    <div className="row">
                                        <Alerta show={true} alertClass="alert-success" message="Enviado com sucesso."/>
                                    </div>
                                    <div className="text-center">
                                        <button className="btn btn-custom"
                                                onClick={() => {this.setState(defaultState)}}>Voltar
                                        </button>
                                    </div>
                                </div>
                                :
                                <div className="container-fluid">
                                    <div className="row">
                                        {
                                            alunoState.fetched && tiposState.fetched && curso.fetched &&
                                            <div className="form-group col-centered">
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
                                                <div className="form-group">
                                                    <div>
                                                        <label htmlFor="tipo">Tipo</label>
                                                        <select name="tipo" id="tipo" className="form-control"
                                                                value={tipo}
                                                                onChange={this.handleChange}>
                                                            <option value=""/>
                                                            {this.renderTipos()}
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="requerimento">Requerimento</label>
                                                    <textarea name="requerimento" id="requerimento" rows="5"
                                                              className="form-control" value={requerimento}
                                                              onChange={this.handleChange}/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="justificativa">Justificativa</label>
                                                    <textarea name="justificativa" id="justificativa" rows="5"
                                                              className="form-control" value={justificativa}
                                                              onChange={this.handleChange}/>
                                                </div>
                                                <Alerta show={erro.erro} message={erro.message}
                                                        alertClass="alert-danger"/>
                                                <div className="input-group text-center">
                                                    {
                                                        requerimentoProp.isFetching ?
                                                            <img src="img/loading-big.gif" className="center-block"/>
                                                            :
                                                            <button type="submit" className="btn btn-custom"
                                                                    onClick={this.handleSubmit}>Enviar
                                                            </button>
                                                    }
                                                </div>
                                            </div>
                                        }
                                    </div>
                                </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        aluno: state.aluno,
        tipos: state.tipos,
        curso: state.curso,
        requerimento: state.requerimento,
    };
}

export default connect(mapStateToProps)(AlunoRequerimento);
