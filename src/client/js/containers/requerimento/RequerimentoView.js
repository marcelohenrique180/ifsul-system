import React from 'react'
import {connect} from 'react-redux'

class RequerimentoView extends React.Component {

    constructor(props){
        super(props);
    }

    render(){
        const {requerimento} = this.props.requerimento;

        return (
            <div>
                <h3 style={{textAlign: "center"}}>Requerimento</h3>
                <div>
                    {
                        requerimento.requerimento &&
                        <div>
                            <div className="form-group">
                                <label htmlFor="requerimento">Requerimento</label>
                                <textarea name="requerimento" id="requerimento" rows="5"
                                          className="form-control" value={requerimento.requerimento}
                                          readOnly="true"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="justificativa">Justificativa</label>
                                <textarea name="justificativa" id="justificativa" rows="5"
                                          className="form-control" value={requerimento.justificativa}
                                          readOnly="true"/>
                            </div>
                        </div>
                    }
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        requerimento: state.requerimento
    };
}

export default connect(mapStateToProps)(RequerimentoView);