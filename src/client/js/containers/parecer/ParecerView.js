import React from 'react'
import {connect} from 'react-redux'
import FloatInput from '../../components/FloatInput'
import {getParecerByRequerimentoId} from '../../actions/parecer'

class ParecerView extends React.Component {

    constructor(props) {
        super(props);
        const {dispatch, selectedParecer} = this.props;

        dispatch(getParecerByRequerimentoId(selectedParecer));
    }

    render() {
        const {selectedParecer, parecer} = this.props;

        if (selectedParecer && parecer.fetched) {
            parecer.parecer.deferido = (parecer.parecer.deferido) ? "Deferido" : "Indeferido";

            return (
                <div>
                    <h4 style={{textAlign: "center"}}>Parecer</h4>
                    <div>
                        <div className="input-group">
                            <FloatInput name="nome" type="text" value={parecer.parecer.parecer}
                                        textLabel="Nome"
                                        readOnly="true"/>
                        </div>
                        <div className="input-group">
                            <FloatInput name="nome" type="text" value={parecer.parecer.deferido}
                                        textLabel="Matricula" readOnly="true"/>
                        </div>
                    </div>
                </div>
            )
        }

        return (<div>Carregandooo...</div>)
    }
}

function mapStateToProps(state) {
    return {
        parecer: state.parecer
    }
}

export default connect(mapStateToProps)(ParecerView)