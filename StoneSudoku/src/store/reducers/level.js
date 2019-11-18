import { SET_DIFFICULTY, RESET_DIFFICULTY, SET_LEVEL_ID, RESET_LEVEL_ID, SET_LEVEL_MODE, RESET_LEVEL_MODE } from '../actions/actionTypes';

const initialState = {
    difficulty: '',
    levelId: null,
    gameMode: ''
};

const levelReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LEVEL_MODE: {
            return {
                ...state,
                gameMode: action.payload
            }
        }
        case RESET_LEVEL_MODE: {
            return {
                ...state,
                gameMode: ''
            }
        }
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