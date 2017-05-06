import React from 'react'
import {connect} from 'react-redux'
import {getRequerimento} from '../../actions/requerimento'
import AlunoInfo from '../../containers/aluno/AlunoInfo'
import ParecerView from '../../containers/parecer/ParecerView'

class VisualizarRequerimento extends React.Component {

    constructor(props) {
        super(props);

        const reqId = this.props.params["requerimento"];
        this.props.dispatch(getRequerimento(reqId))

    }

    render() {
        const {requerimento} = this.props;

        return (
            <div>
                <div className="panel panel-ifsul">
                    <div className="panel-heading text-center">
                        <h3 className="panel-title">
                            Ver Requerimento
                        </h3>
                    </div>
                    <div className="panel-body">
                        {
                            requerimento.fetched &&
                            <div>
                                <AlunoInfo />
                                <ParecerView selectedParecer={requerimento} />
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
        requerimento: state.requerimento
    };
}

export default connect(mapStateToProps)(VisualizarRequerimento);