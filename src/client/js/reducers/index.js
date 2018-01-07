import { combineReducers } from 'redux'
import { userReducer } from './reducer-user'
import { matriculaReducer } from './reducer-matricula'
import { alunoUserReducer } from './reducer-aluno-user'
import { alunoReducer } from './reducer-aluno'
import { tiposReducer } from './reducer-tipos'
import { cursosReducer } from './reducer-curso'
import { requerimentoReducer } from './reducer-requerimento'
import { requerimentoPageReducer } from './reducer-requerimento-page'
import { notificacaoReducer } from './reducer-notificacao'
import { parecerReducer } from './reducer-parecer'
import { requerimentosAbertosReducer } from './reducer-requerimentos-abertos'
/*
 * We combine all reducers into a single object before updated data is dispatched (sent) to store
 * Your entire applications state (store) is just whatever gets returned from all your reducers
 * */

const allReducers = combineReducers({
  usuario: userReducer,
  matricula: matriculaReducer,
  aluno_usuario: alunoUserReducer,
  aluno: alunoReducer,
  tipos: tiposReducer,
  curso: cursosReducer,
  requerimento: requerimentoReducer,
  requerimentoPage: requerimentoPageReducer,
  notificacao: notificacaoReducer,
  parecer: parecerReducer,
  requerimentos_abertos: requerimentosAbertosReducer
})

export default allReducers
