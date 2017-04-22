import React from 'react'
import {connect} from 'react-redux'
import FloatInput from '../../components/FloatInput'
import {handleChange} from '../../util'
import {sendAlunoMatricula} from '../../actions/aluno'
import {novaMatricula} from '../../actions/matricula'

class AlunoCadastro extends React.Component {
    constructor(props){
        super(props);

        this.state = {matricula: "", empty: ""};
        this.handleChange = handleChange.bind(this);
        this.novaMatricula = this.novaMatricula.bind(this);
        this.handleClickMatricula = this.handleClickMatricula.bind(this);
    }

    novaMatricula(){
        this.props.dispatch(novaMatricula());
        this.setState({matricula: ""});
    }
    handleChange(event) {}

    handleClickMatricula(e){
        e.preventDefault();
        const { dispatch } = this.props;
        const {matricula} = this.state;

        if (matricula === "") {
            this.setState({empty: true})
        }else{
            this.setState({empty: false});
            dispatch(sendAlunoMatricula(matricula));
        }
    }

    render (){
        const matriculaRequest = this.props.matricula;
        const {matricula, empty} = this.state;
        const {error, errorMessage} = this.props.matricula;

        return (
            matriculaRequest.fetched ?
                <div className="text-center">
                    <h5 className="text-success">Brevemente será enviado um e-mail à você com o link de cadastro!</h5>
                    <button onClick={this.novaMatricula} className="btn btn-success">Novo Cadastro</button>
                </div>
                :
                <form target="#" className="form-group col-centered">
                    <div className="input-group">
                        <FloatInput name="matricula" value={matricula} textLabel="Insira sua matrícula"
                                    handleChange={this.handleChange}/>
                    </div>
                    {
                        empty ?
                            <div className="alert alert-danger text-center col-xs-8 col-xs-offset-2" role="alert">
                                Favor, insira a Matrícula.
                            </div>
                            :
                            error === true &&
                            <div className="alert alert-danger text-center col-xs-8 col-xs-offset-2" role="alert">
                                {errorMessage}
                            </div>
                    }
                    <div className="input-group text-center">
                        {
                            !matriculaRequest.isFetching ?
                                <button onClick={this.handleClickMatricula} type="submit" className="btn btn-primary">
                                    Enviar
                                </button>
                                :
                                <img src="img/loading-big.gif" className="center-block"/>
                        }
                    </div>
                </form>
        )
    }
}

function mapStateToProps(state) {
    return {
        matricula: state.matricula
    };
}

export default connect(mapStateToProps)(AlunoCadastro);