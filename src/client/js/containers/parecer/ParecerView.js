import React from 'react'
import {connect} from 'react-redux'
import FloatInput from '../../components/FloatInput'
import Carregando from '../../components/Carregando'
import {getParecerByRequerimentoId} from '../../actions/parecer'


class ParecerView extends React.Component {

    constructor(props) {
        super(props);
        const {dispatch, requerimento} = this.props;

        if (requerimento.fetched) {
            dispatch(getParecerByRequerimentoId(requerimento))
        }
    }

    render() {
        const {parecer} = this.props;

        if (typeof parecer.parecer !== "undefined") {
            parecer.parecer.deferido = (parecer.parecer.deferido) ? "Deferido" : "Indeferido";
        }

        return (
            <div>
                <h3 style={{textAlign: "center"}}>Parecer</h3>
                <div>
                    {
                        parecer.error === false ?
                            <div>
                                {
                                    parecer.fetched === true ?
                                        <div>
                                            <div className="input-group">
                                                <FloatInput name="parecer" type="text" value={parecer.parecer.parecer}
                                                            textLabel="Parecer" readOnly="true"/>
                                            </div>
                                            <div className="input-group">
                                                <FloatInput name="deferimento" type="text" value={parecer.parecer.deferido}
                                                            textLabel="Deferimento" readOnly="true"/>
                                            </div>
                                        </div>
                                        :
                                        <Carregando />
                                }
                            </div>
                            :
                            <div>
                                <p style={{textAlign: "center"}}>Nenhum parecer foi dado até agora.</p>
                            </div>
                    }
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        parecer: state.parecer,
        requerimento: state.requerimento
    }
}

export default connect(mapStateToProps)(ParecerView)