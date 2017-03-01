import {combineReducers} from 'redux';
import {userReducer} from './reducer-user'
import {matriculaReducer} from './reducer-matricula'
/*
 * We combine all reducers into a single object before updated data is dispatched (sent) to store
 * Your entire applications state (store) is just whatever gets returned from all your reducers
 * */

const allReducers = combineReducers({
    usuario: userReducer,
    matricula: matriculaReducer
});

export default allReducers
