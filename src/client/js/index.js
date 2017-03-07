import 'babel-polyfill'
import React from 'react'
import ReactDOM from "react-dom"
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {createStore, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import allReducers from './reducers'
import {indexRoute} from './util'

import api from './actions/middleware/api'
import logged from './actions/middleware/logged'

import App from './components/App'
import NaoAutorizado from './components/NaoAutorizado'
import Cadastro from './components/cadastro/Cadastro'

import AlunoRequerimento from './containers/requerimento/AlunoRequerimento'
import AlunoCadastro from './containers/cadastro/AlunoCadastro'
import AlunoConfirmar from './containers/cadastro/AlunoConfirmar'
import AlunoMenu from './containers/menu/AlunoMenu'
import AdminMenu from './containers/menu/AdminMenu'
import Menu from './containers/menu/Menu'
import Login from './containers/Login'

require('bootstrap-loader');
require('../scss/floating-label.scss');

const logger = createLogger();
const store = createStore(
    allReducers,
    applyMiddleware(thunk, api, logger, logged)
);

function requireAuth(nextState, replace) {
    if (!localStorage.getItem("id_token")) {
        replace({
            pathname: '/login',
            state: { nextPathname: nextState.location.pathname }
        })
    }
}

const index = indexRoute();

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <IndexRedirect to={index} />
                <Route path="menu" component={Menu} onEnter={requireAuth}>
                    <Route path="cordcurso" authorize={['CORDCURSO']} component={AdminMenu} />
                    <Route path="aluno" authorize={['ALUNO']} component={AlunoMenu} >
                        <Route path="requerimento" component={AlunoRequerimento} />
                    </Route>
                </Route>
                <Route path="cadastro" component={Cadastro}>
                    <Route path="aluno" component={AlunoCadastro}/>
                    <Route path="aluno/:token" component={AlunoConfirmar}/>
                </Route>
                <Route path="/nao-autorizado" component={NaoAutorizado} />
                <Route path="/login" component={Login} />
            </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
);
