import {combineReducers} from 'redux'
import {userReducer} from './reducer-user'
import {matriculaReducer} from './reducer-matricula'
import {alunoUserReducer} from './reducer-aluno-user'
import {alunoReducer} from './reducer-aluno'
import {tiposReducer} from './reducer-tipos'
import {cursosReducer} from './reducer-curso'
import {requerimentoReducer} from './reducer-requerimento'
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
    requerimento: requerimentoReducer
});

export default allReducers
