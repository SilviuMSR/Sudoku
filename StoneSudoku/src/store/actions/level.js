import { SET_DIFFICULTY, RESET_DIFFICULTY, SET_LEVEL_ID, RESET_LEVEL_ID } from './actionTypes';

export const setDifficulty = difficultyLevel => dispatch => {
    dispatch({
        type: SET_DIFFICULTY,
        payload: difficultyLevel
    })
}

export const resetDifficulty = () => dispatch => {
    dispatch({
        type: RESET_DIFFICULTY
    })
}

export const setLevelId = levelId => dispatch => {
    dispatch({
        type: SET_LEVEL_ID,
        payload: levelId
    })
}

export const resetLevelId = () => dispatch => {
    dispatch({
        type: RESET_LEVEL_ID
    })
}
