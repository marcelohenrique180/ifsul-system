import React from 'react'
import {connect} from 'react-redux'
import FloatInput from '../../components/FloatInput'
import {handleChange} from '../../util'
import {sendAlunoMatricula} from '../../actions/aluno'

class AlunoCadastro extends React.Component {
    constructor(props){
        super(props);

        this.state = {matricula: ""};
        this.handleChange = handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this);
    }

    handleChange(event) {}

    handleClick(){
        const { dispatch } = this.props;
        const {matricula} = this.state;

        dispatch(sendAlunoMatricula({matricula}));
    }

    render (){
        const matriculaRequest = this.props.matricula;
        const {matricula} = this.state;

        return (
            <div className="form-group col-centered">
                <div className="input-group">
                    <FloatInput name="matricula" value={matricula} textLabel="Matrícula" handleChange={this.handleChange}/>
                </div>
                <div className="input-group text-center">
                    {
                        !matriculaRequest.isFetching ?
                            <button onClick={this.handleClick} className="btn btn-primary">
                                Enviar
                            </button>
                            :
                            <img src="img/loading-big.gif" className="center-block"/>
                    }
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        matricula: state.matricula
    };
}

export default connect(mapStateToProps)(AlunoCadastro);