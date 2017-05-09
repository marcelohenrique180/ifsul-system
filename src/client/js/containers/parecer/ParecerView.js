import React from 'react'
import {connect} from 'react-redux'
import FloatInput from '../../components/FloatInput'
import {getParecerByRequerimentoId} from '../../actions/parecer'
import {getRequerimento} from '../../actions/requerimento'

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

        if (parecer.parecer) {
            parecer.parecer.deferido = (parecer.parecer.deferido) ? "Deferido" : "Indeferido";
        }

        return (
            <div>
                <h4 style={{textAlign: "center"}}>Parecer</h4>
                <div>
                    {
                        parecer.parecer != undefined ?
                            <div>
                                {
                                    parecer.parecer.parecer &&
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
                                }
                            </div>
                            :
                            <div>
                                <p style={{textAlign: "center"}}>Nenhum parecer foi dado ainda.</p>
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