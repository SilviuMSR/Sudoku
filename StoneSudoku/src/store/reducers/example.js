import { EXAMPLE } from '../actions/actionTypes';

const initialState = {
    message: null
};

const exampleReducer = (state = initialState, action) => {
    switch (action.type) {
        case EXAMPLE:
            return {
                ...state,
                message: 'Working'
            }
        default:
            return state;
    }
};

export default exampleReducer;