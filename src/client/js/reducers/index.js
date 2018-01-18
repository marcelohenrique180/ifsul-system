// @flow

import { combineReducers } from 'redux'
import { usuarioReducer } from './reducer-user'
import { matriculaReducer } from './reducer-matricula'
import { alunoUsuarioReducer } from './reducer-aluno-user'
import { alunoReducer } from './reducer-aluno'
import { tiposReducer } from './reducer-tipos'
import { cursosReducer } from './reducer-curso'
import { requerimentoReducer } from './reducer-requerimento'
import { requerimentoPageReducer } from './reducer-requerimento-page'
import { notificacaoReducer } from './reducer-notificacao'
import { parecerReducer } from './reducer-parecer'
import { requerimentosAbertosReducer } from './reducer-requerimentos-abertos'

const allReducers = combineReducers({
  usuario: usuarioReducer,
  matricula: matriculaReducer,
  aluno_usuario: alunoUsuarioReducer,
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
