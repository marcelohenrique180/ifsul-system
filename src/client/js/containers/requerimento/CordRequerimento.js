import React from 'react'
import {connect} from 'react-redux'
import Carregando from '../../components/Carregando'
import RequerimentoView from '../../containers/requerimento/RequerimentoView'
import AlunoInfo from '../../containers/aluno/AlunoInfo'
import {getRequerimento, resetRequerimento} from '../../actions/requerimento'
import {requestTipos, resetTipo} from '../../actions/tipo'
import {getAluno, resetAluno} from '../../actions/aluno'
import {requestCursos, resetCurso} from '../../actions/curso'
import {handleChange} from '../../util'

require('../../../scss/panel-ifsul.scss');

export function reload(dispatch, requerimentoId) {

    dispatch(resetRequerimento());
    dispatch(resetTipo());
    dispatch(resetAluno());
    dispatch(resetCurso());

    dispatch(getRequerimento(requerimentoId)).then(
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

class CordRequerimento extends React.Component {

    constructor(props){
        super(props);
        const {dispatch} = this.props;
        this.state = {deferido: "", requerimentoId: this.props.params["requerimento"]};

        if (this.props.requerimento.fetched === false && this.props.requerimento.isFetching === false){
            reload.bind(this)(dispatch, this.state.requerimentoId)
        }

        this.handleChange = handleChange.bind(this);
    }

    render(){
        const alunoProp = this.props.aluno;
        const requerimentoProp = this.props.requerimento;
        const tipoProp = this.props.tipo;
        const cursoProp = this.props.curso;

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
                                    requerimentoProp.fetched && alunoProp.fetched && tipoProp.fetched && cursoProp.fetched ?
                                        <div className="form-group col-centered">
                                            <AlunoInfo />
                                            <RequerimentoView />
                                            <h3 className="text-center">Parecer</h3>
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
                                        <Carregando/>
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