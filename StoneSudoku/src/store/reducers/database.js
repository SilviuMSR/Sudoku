import { CREATE_DATABASE, CLOSE_DATABASE } from '../actions/actionTypes';

const initialState = {
    db: null
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
        default:
            return state;
    }
};

export default databaseReducer;