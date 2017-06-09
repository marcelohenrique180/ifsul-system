import React from 'react'
import {connect} from 'react-redux'
import autobind from 'autobind-decorator'
import FloatInput from '../../components/FloatInput'
import Alerta from '../../components/Alerta'
import {handleChange} from '../../util'
import {sendAlunoSenha} from '../../actions/aluno'

class AlunoCadastro extends React.Component {
    constructor(props){
        super(props);

        this.state = {senha: ""};
        this.handleChange = handleChange.bind(this);
    }

    @autobind
    handleClickSenha(){
        const {senha} = this.state;
        const token = this.props.params["token"];

        this.props.sendAlunoSenha({senha, token});
    }

    render (){
        const {senha} = this.state;
        const {error, errorMessage} = this.props.usuario;
        const usuario = this.props.usuario;

        return (
            <div className="form-group col-xs-10 col-xs-offset-1 col-sm-4 col-sm-offset-4">
                <div className="input-group ">
                    <FloatInput name="senha" value={senha} textLabel="Senha" type="password"
                                handleChange={this.handleChange}/>
                </div>
                <Alerta show={error} alertClass="alert-danger" message={errorMessage} />
                <div className="input-group text-center">
                    {
                        !usuario.isFetching ?
                            <button onClick={this.handleClickSenha} className="btn btn-primary">
                                Enviar
                            </button>
                            :
                            <img src="img/loading-big.gif" className="center-block"/>
                    }
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        usuario: state.aluno_usuario
    };
}

function mapDispatchToProps(dispatch) {
    return {
        sendAlunoSenha: (credentials) => dispatch(sendAlunoSenha(credentials))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AlunoCadastro);