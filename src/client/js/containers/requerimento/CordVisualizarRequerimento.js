import React, {Component} from 'react'
import {connect} from 'react-redux'
import autobind from 'autobind-decorator'
import {getRequerimentoByPage} from '../../actions/requerimento'
import Paginator from '../../components/Paginator'

const requerimentosAbertosApi = "requerimentos?size=5&";

class CordVisualizarRequerimento extends Component {

    constructor(props){
        super(props);

        this.state = {currentPage: 0};
        this.props.getRequerimentoByPage(requerimentosAbertosApi+"page=0")
    }

    @autobind
    getRequerimentoByPage(page){
        return () => {
            const pageNum = page.match(/page=([0-9])+/)[1];
            this.setState( {currentPage: parseInt(pageNum)} );

            this.props.getRequerimentoByPage(page).then( this.requestTableContent )
        }
    }

    render(){
        return (
            <Paginator pageableEntity={this.props.requerimentos.requerimento}
                       currentPage={this.state.currentPage}
                       location={this.props.location}
                       api={requerimentosAbertosApi}
                       onClickHandler={this.getRequerimentoByPage}/>
        )
    }
}

function mapStateToProps(state) {
    return {
        requerimentos: state.requerimentoPage
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getRequerimentoByPage: page => dispatch(getRequerimentoByPage(page))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CordVisualizarRequerimento);