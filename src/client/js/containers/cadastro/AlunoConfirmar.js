import React from 'react'
import {connect} from 'react-redux'
import FloatInput from '../../components/FloatInput'
import {handleChange} from '../../util'
import {sendAlunoSenha} from '../../actions/aluno'

class AlunoCadastro extends React.Component {
    constructor(props){
        super(props);

        this.state = {senha: ""};
        this.handleChange = handleChange.bind(this);
        this.handleClickSenha = this.handleClickSenha.bind(this);
    }

    handleChange(event) {}

    handleClickSenha(){
        const { dispatch } = this.props;
        const {senha} = this.state;
        const token = this.props.params["token"];

        dispatch(sendAlunoSenha({senha, token}));
    }

    render (){
        const {senha} = this.state;
        const {error, errorMessage} = this.props.usuario;
        const usuario = this.props.usuario;

        return (
            <div className="form-group col-centered">
                <div className="input-group">
                    <FloatInput name="senha" value={senha} textLabel="Senha"
                                handleChange={this.handleChange}/>
                </div>
                {
                    error === true &&
                    <div className="alert alert-danger text-center col-xs-8 col-xs-offset-2" role="alert">
                        {errorMessage}
                    </div>
                }
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

export default connect(mapStateToProps)(AlunoCadastro);