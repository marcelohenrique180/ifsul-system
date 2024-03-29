import 'babel-polyfill'
import '../scss/style.scss'

import { IndexRedirect, Route, Router, browserHistory } from 'react-router'
import { applyMiddleware, createStore } from 'redux'

import AlunoCadastro from './containers/cadastro/AlunoCadastro'
import AlunoConfirmar from './containers/cadastro/AlunoConfirmar'
import AlunoMenu from './containers/menu/AlunoMenu'
import AlunoRequerimento from './containers/requerimento/AlunoRequerimento'
import AlunoVisualizarRequerimento from './containers/requerimento/AlunoVisualizarRequerimento'
import AlunoVisualizarRequerimentos from './containers/requerimento/AlunoVisualizarRequerimentos'
import App from './components/App'
import CordMenu from './containers/menu/CordMenu'
import CordRequerimento from './containers/requerimento/CordRequerimento'
import CordRequerimentoAberto from './containers/requerimento/CordRequerimentoAberto'
import CordVisualizarRequerimentos from './containers/requerimento/CordVisualizarRequerimentos'
import Login from './containers/Login'
import Menu from './containers/menu/Menu'
import NaoAutorizado from './components/NaoAutorizado'
import PlainPaper from './components/PlainPaper'
import { Provider } from 'react-redux'
import React from 'react'
import ReactDOM from 'react-dom'
import allReducers from './reducers'
import api from './actions/middleware/api'
import { createLogger } from 'redux-logger'
import { indexRoute } from './util'
import logged from './actions/middleware/logged'
import thunk from 'redux-thunk'

const logger = createLogger()
const store = createStore(
  allReducers,
  applyMiddleware(thunk, api, logger, logged)
)

function requireAuth(nextState, replace) {
  if (!localStorage.getItem('id_token')) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

const index = indexRoute()

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Router path="/" component={PlainPaper}>
        <IndexRedirect to={index} />
        <Route path="/login" component={Login} />
        <Route path="cadastro/aluno" component={AlunoCadastro} />
        <Route path="cadastro/aluno/:token" component={AlunoConfirmar} />
      </Router>
      <Route path="/" component={App}>
        <IndexRedirect to={index} />
        <Route path="menu" component={Menu} onEnter={requireAuth}>
          <Route
            path="cordcurso"
            authorize={['CORDCURSO']}
            component={CordMenu}
          >
            <Route
              path="requerimento/abertos"
              component={CordRequerimentoAberto}
            />
            <Route
              path="requerimento/visualizar"
              component={CordVisualizarRequerimentos}
            />
            <Route
              path="requerimento/:requerimento"
              component={CordRequerimento}
            />
          </Route>
          <Route path="aluno" authorize={['ALUNO']} component={AlunoMenu}>
            <Route
              path="requerimento/solicitar"
              component={AlunoRequerimento}
            />
            <Route
              path="requerimento/visualizar"
              component={AlunoVisualizarRequerimentos}
            />
            <Route
              path="requerimento/visualizar/:requerimento"
              component={AlunoVisualizarRequerimento}
            />
          </Route>
        </Route>
        <Route path="/nao-autorizado" component={NaoAutorizado} />
        <Route path="/logout" component={Login} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)
