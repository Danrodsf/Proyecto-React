import { combineReducers } from 'redux';
import credentials from './credentials-reducer';
import state from './state-reducer';


const rootReducer = combineReducers({
    credentials, state
});

export default rootReducer;