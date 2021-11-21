import {
  SETDATA,
  REMOVEDATA,
  UPDATEUSERS,
  UPDATEMOVIES,
  UPDATEORDERS,
  UPDATEFILTER,
} from "../types";

const initialState = {
  movies: {},
  users: {},
  orders: {},
  filter: {},
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case SETDATA:
      return action.payload;

    case REMOVEDATA:
      return initialState;

    case UPDATEUSERS:
      return { ...state, users: action.payload };
    case UPDATEMOVIES:
      return { ...state, movies: action.payload };
    case UPDATEORDERS:
      return { ...state, orders: action.payload };
    case UPDATEFILTER:
      return { ...state, filter: action.payload };

    default:
      return state;
  }
};

export default dataReducer;
