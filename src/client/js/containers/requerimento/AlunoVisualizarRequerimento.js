import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {getRequerimentoByPage} from '../../actions/requerimento'
import {requestTipos} from '../../actions/tipo'
import {callApi} from '../../actions/middleware/api'
import {getId} from '../../util'
import Carregando from '../../components/Carregando'

const requerimentoApi = "requerimentos?size=5&";

class AlunoVisualizarRequerimento extends React.Component {

    constructor(props){
        super(props);
        this.state = {currentPage: 0, tipos: [], pareceres: []};
        const {dispatch} = this.props;

        this.requestTableContent = this.requestTableContent.bind(this);
        dispatch(getRequerimentoByPage(requerimentoApi+"page=0")).then( this.requestTableContent );

        this.getRequerimentoByPage = this.getRequerimentoByPage.bind(this);
        this.renderLines = this.renderLines.bind(this);
        this.renderNavigation = this.renderNavigation.bind(this);
    }

    requestTableContent(response){
        const {dispatch} = this.props;
        const {requerimentos} = response.response._embedded;
        const tipos = [];
        const pareceres = [];

        for ( let i = 0; i < requerimentos.length; i++ ){

            dispatch(requestTipos( requerimentos[i]._links.tipo.href )).then( tipo => {
                tipos[i] = tipo;
                this.setState({tipos});
            }).catch( () => {
                tipos[i] = "";
                this.setState({tipos})
            });

            let requerimentoId = requerimentos[i]._links.self.href.match(/\d+$/)[0];
            callApi( ("pareceres/search/findByRequerimentoId?id="+requerimentoId), {}, true ).then( parecer => {
                pareceres[i] = parecer;
                this.setState({pareceres});
            }).catch( () => {
                pareceres[i] = "";
                this.setState({pareceres})
            })
        }
    }

    getRequerimentoByPage(page){
        return () => {
            const pageNum = page.match(/page=([0-9])+/)[1];
            this.setState( {currentPage: parseInt(pageNum)} );

            this.props.dispatch(getRequerimentoByPage(page)).then( this.requestTableContent )
        }
    }

    renderLines(){
        let data;
        const {requerimentos} = this.props.requerimentos.requerimento._embedded;
        const {tipos, pareceres} = this.state;

        if (requerimentos.length > 0){
            data = (
                <tbody>
                    {
                        requerimentos.map((requerimento, i) => {
                            const tipo = tipos[i] || null;
                            const parecer = pareceres[i] || null;
                            const requerimentoId = getId(requerimento);

                            return (
                                <tr key={i}>
                                    <td>
                                        {
                                            tipo !== null ?
                                            <Link to={"/menu/aluno/requerimento/visualizar/"+requerimentoId}>
                                                {tipo.response.tipo}
                                            </Link>
                                            :
                                            <p>&nbsp;</p>
                                        }
                                    </td>
                                    <td>{requerimento.requerimento}</td>
                                    {
                                        parecer ?
                                            <td>{ parecer.deferido === true ? "Deferido" : "Não Deferido" }</td>
                                            :
                                            <td>Em Andamento</td>
                                    }
                                    <td>{ parecer === null ? <span>&nbsp;</span> : parecer.parecer }</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            )
        }

        return data
    }

    renderNavigation(){
        const {_links, page} = this.props.requerimentos.requerimento;
        const {currentPage} = this.state;
        const self = this.props.location.pathname;
        let pagination = "";

        if (page.totalElements - 1 > 0) {
            const itens = () => {
                const array = [];

                const pageControl = (() => {
                    const {totalPages} = page;
                    const pages = 6;
                    const pageControl = {};

                    if (pages >= totalPages) {
                        pageControl.start = 0;
                        pageControl.end = totalPages - 1;
                    } else {
                        if (totalPages - currentPage <= pages/2){//ending node
                            pageControl.start = totalPages - pages - 1;
                            pageControl.end = totalPages - 1;
                        }
                        else if (pages/2 > currentPage){//starting node
                            pageControl.start = 0;
                            pageControl.end = pages;
                        } else {
                            pageControl.start = currentPage - (pages/2);
                            pageControl.end = currentPage + (pages/2);
                        }
                    }

                    return pageControl
                })();

                for (let i=pageControl.start; i <= pageControl.end; i++){
                    if (i !== currentPage){
                        array.push(
                            <li key={i}>
                                <Link to={self} onClick = {this.getRequerimentoByPage(requerimentoApi+"page="+(i))} >
                                    {i+1}
                                </Link>
                            </li>
                        )
                    } else {
                        array.push(
                            <li className="active" key={i}>
                                <Link to={self}
                                      onClick = {() => { this.getRequerimentoByPage(requerimentoApi+"page="+(i))}} >
                                    {i+1}
                                </Link>
                            </li>
                        )
                    }
                }
                return array
            };

            if (_links.first){
                pagination =
                    <div>
                        <ul className="pagination">
                            <li>
                                <Link to={self} onClick = {this.getRequerimentoByPage(_links.first.href)} >
                                    &laquo;
                                </Link>
                            </li>
                            {itens()}
                            <li>
                                <Link to={self} onClick = {this.getRequerimentoByPage(_links.last.href)} >
                                    &raquo;
                                </Link>
                            </li>
                        </ul>
                    </div>
            }
        }

        return pagination
    }

    render() {
        const {page} = this.props.requerimentos.requerimento;
        let {_embedded} = this.props.requerimentos.requerimento;

        if (_embedded){
            const {requerimentos} = _embedded;
            if (requerimentos.length > 0){
                return (
                    <div>
                        <div className="panel panel-default">
                            <div className="panel-heading">

                                Meus Requerimentos
                            </div>
                            {
                                page !== undefined &&
                                <div className="panel-body table-responsive">
                                    <table className="table table-hover">
                                        <thead>
                                        <tr>
                                            <th>Tipo</th>
                                            <th>Requerimento</th>
                                            <th>Status</th>
                                            <th>Parecer</th>
                                        </tr>
                                        </thead>
                                        {this.renderLines()}
                                    </table>
                                    {this.renderNavigation()}
                                </div>
                            }
                        </div>
                    </div>
                )
            }
        }

        return (
            <div>
                <div className="panel panel-default">
                    <div className="panel-heading">
                        Meus Requerimentos
                    </div>
                    {
                        this.props.requerimentos.error ?
                            <h4 className="text-center">
                                Você ainda não possui Requerimentos
                            </h4>
                            :
                            <Carregando />
                    }
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        requerimentos: state.requerimentoPage
    };
}

export default connect(mapStateToProps)(AlunoVisualizarRequerimento);