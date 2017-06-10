import React, {Component} from 'react'
import {handleChange} from '../../util'
import FloatInput from '../../components/FloatInput'

export default class ParecerInsert extends Component {
    constructor(props){
        super(props);

        this.state = {deferido: "", parecer: "", memorando: ""};
        this.handleChange = handleChange.bind(this);
    }

    render(){
        return (
            <div>
                <h3 className="text-center">Parecer</h3>
                <div className="form-group">
                    <div className="form-group">
                        <div className="radio">
                            <label>
                                <input type="radio" name="deferido" value="deferido"
                                       checked={this.state.deferido === "deferido"}
                                       onChange={this.handleChange}/>Deferir
                            </label>
                        </div>
                        <div className="radio">
                            <label>
                                <input type="radio" name="deferido" value="naodeferido"
                                       checked={this.state.deferido === "naodeferido"}
                                       onChange={this.handleChange}/>Não Deferir
                            </label>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="parecer">Parecer</label>
                        <textarea name="parecer" id="parecer" rows="5"
                                  className="form-control" value={this.state.parecer}
                                  onChange={this.handleChange}/>
                    </div>
                    <a href="#" target="_blank" className="pull-right">Gerar Memorando</a>
                    <div className="input-group">
                        <FloatInput name="memorando" type="text" value={this.state.memorando}
                                    handleChange={this.handleChange} textLabel="Nº do Memorando"/>
                    </div>
                    <div className="input-group text-center">
                        <button type="submit" className="btn btn-custom">Enviar</button>
                    </div>
                </div>
            </div>
        )
    }
}