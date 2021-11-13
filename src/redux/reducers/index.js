import { combineReducers } from 'redux';
import credentials from './credentials-reducer';
import state from './state-reducer';
import data from './Data-reducer';

const rootReducer = combineReducers({
    credentials, state, data
});

export default rootReducer;