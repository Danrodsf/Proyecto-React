import { combineReducers } from 'redux';
import credentials from './credentials-reducer.js';


const rootReducer = combineReducers({
    credentials
});

export default rootReducer;