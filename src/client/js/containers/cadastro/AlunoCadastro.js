import React from 'react'
import {connect} from 'react-redux'
import autobind from 'autobind-decorator'
import FloatInput from '../../components/FloatInput'
import Alerta from '../../components/Alerta'
import {handleChange} from '../../util'
import {sendAlunoMatricula} from '../../actions/aluno'
import {novaMatricula} from '../../actions/matricula'

class AlunoCadastro extends React.Component {

    constructor(props){
        super(props);

        this.state = {matricula: "", formError: {matricula: false}};
        this.handleChange = handleChange.bind(this);
    }

    @autobind
    handleChangeForm(event){
        this.setState( {formError: {[event.target.name]: false} });
        this.handleChange(event);
    };

    @autobind
    novaMatricula(){
        this.props.novaMatricula();
        this.setState({matricula: ""});
    }

    @autobind
    handleClickMatricula(e){
        e.preventDefault();
        const {matricula} = this.state;

        if (matricula === "") {
            this.setState({formError: {matricula: true}})
        }else{
            this.setState({formError: {matricula: false}});
            this.props.sendAlunoMatricula(matricula);
        }
    }

    render (){
        const matriculaRequest = this.props.matricula;
        const {matricula, formError} = this.state;
        const {error, errorMessage} = this.props.matricula;

        return (
            matriculaRequest.fetched ?
                <div className="text-center">
                    <h5 className="text-success">Brevemente será enviado um e-mail à você com o link de cadastro!</h5>
                    <button onClick={this.novaMatricula} className="btn btn-success">Novo Cadastro</button>
                </div>
                :
                <form target="#" className="form-group col-xs-10 col-xs-offset-1 col-sm-4 col-sm-offset-4">
                    <div className="input-group">
                        <FloatInput name="matricula" value={matricula} textLabel="Insira sua matrícula"
                                    handleChange={this.handleChangeForm}/>
                    </div>
                    {
                        formError.matricula ?
                            <Alerta alertClass="alert-danger" message="Favor, insira a Matrícula."/>
                            :
                            <Alerta show={error} alertClass="alert-danger" message={errorMessage}/>
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

function mapDispatchToProps(dispatch) {
    return {
        sendAlunoMatricula: matricula => dispatch(sendAlunoMatricula(matricula)),
        novaMatricula: () => dispatch(novaMatricula())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AlunoCadastro);