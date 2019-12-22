import { CREATE_DATABASE, CLOSE_DATABASE, SET_USERNAME } from '../actions/actionTypes';

const initialState = {
    db: null,
    username: ""
};

const databaseReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_DATABASE:
            return {
                ...state,
                db: action.payload.db
            }
        case CLOSE_DATABASE:
            return {
                ...state,
                db: null
            }
        case SET_USERNAME:
            return {
                ...state,
                username: action.payload
            }
        default:
            return state;
    }
};

export default databaseReducer;