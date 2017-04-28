import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {getRequerimentoByPage} from '../../actions/requerimento'

const requerimentoApi = "requerimentos?size=5&";

class AlunoVisualizarRequerimento extends React.Component {

    constructor(props){
        super(props);
        this.state = {currentPage: 0};

        this.props.dispatch(getRequerimentoByPage(requerimentoApi+"page=0")).then( r =>
            {}
        );

        this.getRequerimentoByPage = this.getRequerimentoByPage.bind(this);
        this.renderLines = this.renderLines.bind(this);
        this.renderNavigation = this.renderNavigation.bind(this);
    }

    getRequerimentoByPage(page){
        return () => {
            const pageNum = page.match(/page=([0-9])+/)[1];
            this.setState( {currentPage: parseInt(pageNum)} );

            this.props.dispatch(getRequerimentoByPage(page))
        }
    }

    renderLines(){
        const {requerimentos} = this.props.requerimentos.requerimento._embedded;

        return requerimentos.map((requerimento, i) => {

            return (
                <tr key={i}>
                    <td>{requerimento.requerimento}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            )
        })
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
                    if (i != currentPage){
                        array.push(
                            <li key={i}><Link to={self} onClick = {this.getRequerimentoByPage(requerimentoApi+"page="+(i))} >{i+1}</Link></li>
                        )
                    } else {
                        array.push(
                            <li className="active" key={i}><Link to={self} onClick = {() => { this.getRequerimentoByPage(requerimentoApi+"page="+(i))}} >{i+1}</Link></li>
                        )
                    }
                }
                return array
            };
            pagination =
                <div>
                    <ul className="pagination">
                        <li><Link to={self} onClick = {this.getRequerimentoByPage(_links.first.href)} >&laquo;</Link></li>
                        {itens()}
                        <li><Link to={self} onClick = {this.getRequerimentoByPage(_links.last.href)} >&raquo;</Link></li>
                    </ul>
                </div>
        }

        return pagination
    }

    render() {
        const {fetched} = this.props.requerimentos;

        return (
            <div>
                <div className="panel panel-default">
                    <div className="panel-heading">
                        Meus Requerimentos
                    </div>
                    {
                        fetched &&
                        <div className="panel-body table-responsive">
                            <table className="table table-hover">
                                <thead>
                                <tr>
                                    <th>Requerimento</th>
                                    <th>Status</th>
                                    <th>Deferido</th>
                                    <th>Parecer</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    this.renderLines()
                                }
                                </tbody>
                            </table>
                            {
                                this.renderNavigation()
                            }
                        </div>
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