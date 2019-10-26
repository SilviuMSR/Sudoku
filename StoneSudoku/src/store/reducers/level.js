import { SET_DIFFICULTY, RESET_DIFFICULTY, SET_LEVEL_ID, RESET_LEVEL_ID } from '../actions/actionTypes';

const initialState = {
    difficulty: '',
    levelId: null
};

const levelReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_DIFFICULTY:
            return {
                ...state,
                difficulty: action.payload
            }
        case RESET_DIFFICULTY:
            return {
                ...state,
                difficulty: ''
            }
        case SET_LEVEL_ID:
            return {
                ...state,
                levelId: action.payload
            }
        case RESET_LEVEL_ID:
            return {
                ...state,
                levelId: null
            }
        default:
            return state;
    }
};

export default levelReducer;