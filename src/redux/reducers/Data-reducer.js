import { SETDATA, REMOVEDATA, UPDATEUSERS, UPDATEMOVIES, UPDATEORDERS, UPDATEFILTER } from '../types';

const initialState = {

    movies: {},
    users: {},
    orders: {},
    filter: {}

};

const dataReducer = (state = initialState, action) => {
    switch (action.type) {
        //Ejemplo de añadido de datos
        case SETDATA:
            return action.payload;

        //Ejemplo de reestablecimiento o borrado de datos
        case REMOVEDATA:
            return initialState;

        //Ejemplo de modificacion de datos
        case UPDATEUSERS:
            return { ...state, users: action.payload };
        case UPDATEMOVIES:
            return { ...state, movies: action.payload };
        case UPDATEORDERS:
            return { ...state, orders: action.payload };
        case UPDATEFILTER:
            return { ...state, filter: action.payload };

        default:
            return state
    }
}

export default dataReducer;