import { SETSTATE, INITSTATE } from '../types';

const initialState = {
    change: ''
};

const stateReducer = (state = initialState, action) => {
    switch (action.type) {

        case SETSTATE:
            return action.payload;

        case INITSTATE:
            return initialState;

        default:
            return state
    }
}
export default stateReducer;