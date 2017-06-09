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

        this.state = {senha: "", formError: {senha: false, message: ""}};
        this.handleChange = handleChange.bind(this);
    }

    @autobind
    handleClickSenha(e){
        e.preventDefault();
        const {senha} = this.state;
        const token = this.props.params["token"];

        if (senha === "") {
            this.setState({formError: {senha: true, message: "Senha deve ser informada!"}});
        }
        else if(senha.search(/(?=.*\d)/g)){
            this.setState({formError: {senha: true, message: "Senha deve conter pelo menos 1 número"}});
        }
        else if(senha.search(/(?=.*[A-Z])/g)){
            this.setState({formError: {senha: true, message: "Senha deve conter pelo menos 1 letra maiúscula"}});
        }
        else if(senha.search(/(?=.*[a-z])/g)){
            this.setState({formError: {senha: true, message: "Senha deve conter pelo menos 1 letra minúscula"}});
        }
        else if(senha.search(/([a-zA-Z0-9]{8,})/g)){
            this.setState({formError: {senha: true, message: "Senha deve conter pelo menos 8 caracteres."}});
        }
        else {
            this.setState({formError: {senha: false}});
            this.props.sendAlunoSenha({senha, token});
        }
    }

    render (){
        const {senha, formError} = this.state;
        const {error, errorMessage} = this.props.usuario;
        const usuario = this.props.usuario;

        return (
            <form className="form-group col-xs-10 col-xs-offset-1 col-sm-4 col-sm-offset-4">
                <div className="input-group ">
                    <FloatInput name="senha" value={senha} textLabel="Senha" type="password"
                                handleChange={this.handleChange}/>
                </div>
                {
                    formError.senha === true ?
                        <Alerta alertClass="alert-danger" message={formError.message} />
                        :
                        <Alerta show={error} alertClass="alert-danger" message={errorMessage} />
                }
                <div className="input-group text-center">
                    {
                        !usuario.isFetching ?
                            <button onClick={this.handleClickSenha} type="submit" className="btn btn-primary">
                                Enviar
                            </button>
                            :
                            <img src="img/loading-big.gif" className="center-block"/>
                    }
                </div>
            </form>
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