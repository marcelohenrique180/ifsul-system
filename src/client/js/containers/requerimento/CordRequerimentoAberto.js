import React from 'react'
import {connect} from 'react-redux'
import {Link}from 'react-router'
import autobind from 'autobind-decorator'
import {getId} from '../../util'
import {handleChange} from '../../util'
import {getRequerimentosEmAberto} from '../../actions/requerimento'
import {getAluno} from '../../actions/aluno'
import Carregando from '../../components/Carregando'

class CordRequerimentoAberto extends React.Component {

    constructor(props){
        super(props);

        this.state = {search: "", requerimentos: [], filteredRequerimentos: []};
        this.props.getRequerimentosEmAberto().then(reqsAbertos => {
            reqsAbertos.response._embedded.requerimentos.forEach( requerimento => {
                this.props.getAluno(requerimento._links.aluno.href).then( aluno => {

                    this.setState({
                        requerimentos: this.state.requerimentos.concat([
                            "Req.Nº"+getId(requerimento)+" "+aluno.response.nome+" "+aluno.response.matricula
                        ])
                    });
                    this.setState({filteredRequerimentos: this.state.requerimentos})
                })
            })
        });
        this.handleChange = handleChange.bind(this);
    }

    @autobind
    renderRequerimentos(){

        return this.state.filteredRequerimentos.map( (reqAberto, i) => {
            return (
                <li key={i} className="list-group-item"> {reqAberto} </li>
            )
        })
    }

    @autobind
    handleSearch(event){
        this.handleChange(event);

        this.setState( {filteredRequerimentos:
            this.state.requerimentos.filter(campo => campo.toLowerCase().includes(event.target.value.toLowerCase()))
        });

    }

    render(){
        const {requerimentos_abertos} = this.props;

        return (
            <div>
                <div className="panel panel-default panel--requerimentos">
                    <div className="panel-heading">Requerimentos em Aberto</div>
                    <div className="panel-body">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <div className="input-group">
                                    <input id="search" className="form-control" type="text" placeholder="Pesquisar"
                                           name="search"
                                           onChange={this.handleSearch} value={this.state.search} />
                                </div>
                            </div>
                            <div className="panel-body panel-body--requerimentos">
                                {
                                    requerimentos_abertos.isFetching &&
                                    <Carregando />
                                }
                                {
                                    requerimentos_abertos.fetched &&
                                    <ul className="list-group">
                                        {this.renderRequerimentos()}
                                    </ul>
                                }
                            </div>
                        </div>
                        <Link to="/" className="center-block text-center"><b>Ver Todos</b></Link>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        requerimentos_abertos: state.requerimentos_abertos
    }
}

function mapDispatchToProps(dispatch){
    return {
        getRequerimentosEmAberto: () => dispatch(getRequerimentosEmAberto()),
        getAluno: url => dispatch(getAluno(url))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CordRequerimentoAberto)
