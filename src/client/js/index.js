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
import AlunoCadastro from './containers/cadastro/AlunoCadastro'
import AlunoMenu from './containers/AlunoMenu'
import Menu from './containers/Menu'
import AdminMenu from './containers/AdminMenu'
import Login from './containers/Login'

require('bootstrap');
require('../scss/floating-label.scss')

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
                <Route path="menu" authorize={['CORDCURSO', 'ALUNO']} component={Menu} onEnter={requireAuth}>
                    <Route path="cordcurso" component={AdminMenu} />
                    <Route path="aluno" component={AlunoMenu} />
                </Route>
                <Route path="cadastro" component={Cadastro}>
                    <Route path="aluno" component={AlunoCadastro}/>
                </Route>
                <Route path="/nao-autorizado" component={NaoAutorizado} />
                <Route path="/login" component={Login} />
            </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
);
