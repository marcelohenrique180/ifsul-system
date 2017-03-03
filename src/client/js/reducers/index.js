import {combineReducers} from 'redux'
import {userReducer} from './reducer-user'
import {matriculaReducer} from './reducer-matricula'
import {alunoUserReducer} from './reducer-aluno-user'
/*
 * We combine all reducers into a single object before updated data is dispatched (sent) to store
 * Your entire applications state (store) is just whatever gets returned from all your reducers
 * */

const allReducers = combineReducers({
    usuario: userReducer,
    matricula: matriculaReducer,
    aluno_usuario: alunoUserReducer
});

export default allReducers
