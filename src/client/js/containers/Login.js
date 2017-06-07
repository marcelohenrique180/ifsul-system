import React, {Component} from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import {loginUser} from '../actions/'
import {handleChange} from '../util'
import FloatInput from '../components/FloatInput'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {email: '', senha: ''};

        this.handleChange = handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleChange(event) {}

    render() {
        const { errorMessage } = this.props.user;
        const {email, senha} = this.state;

        return (
            <div>
                <h2 className="text-center">Login</h2>
                <form id="login-form" className="form-group col-xs-10 col-xs-offset-1 col-sm-4 col-sm-offset-4">
                    <div className="input-group">
                        <FloatInput name="email" value={email} textLabel="E-mail" handleChange={this.handleChange} />
                    </div>
                    <div className="input-group">
                        <FloatInput name="senha" value={senha} type="password" textLabel="Senha"
                                    handleChange={this.handleChange} />
                    </div>
                    {
                        errorMessage !== "" &&
                        <div className="alert alert-danger text-center col-xs-8 col-xs-offset-2" role="alert">
                            {errorMessage}
                        </div>
                    }
                    <div className="input-group text-center">
                        <button onClick={this.handleClick} className="btn btn-primary">
                            Login
                        </button>
                    </div>
                    <div className="text-center">
                        <Link to="/cadastro/aluno" >Ainda não tem conta?</Link>
                    </div>
                </form>
            </div>
        )
    }

    handleClick(e) {
        e.preventDefault();
        const { dispatch } = this.props;
        const {email, senha} = this.state;

        const creds = { username: email.trim(), password: senha.trim() };

        dispatch(loginUser(creds));
    }
}

function mapStateToProps(state) {
    return {
        user: state.usuario
    };
}

export default connect(mapStateToProps)(Login);
