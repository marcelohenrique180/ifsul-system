import React from 'react'
import {connect} from 'react-redux'
import FloatInput from '../../components/FloatInput'
import {handleChange} from '../../util'
import {sendAlunoMatricula} from '../../actions/aluno'

class AlunoCadastro extends React.Component {
    constructor(props){
        super(props);

        this.state = {matricula: ""};
        this.handleChange = handleChange.bind(this);
        this.handleClickMatricula = this.handleClickMatricula.bind(this);
    }

    handleChange(event) {}

    handleClickMatricula(){
        const { dispatch } = this.props;
        const {matricula} = this.state;

        dispatch(sendAlunoMatricula(matricula));
    }

    render (){
        const matriculaRequest = this.props.matricula;
        const {matricula} = this.state;
        const {error, errorMessage} = this.props.matricula;

        return (
            <form target="#" className="form-group col-centered">
                <div className="input-group">
                    <FloatInput name="matricula" value={matricula} textLabel="Insira sua matrícula"
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