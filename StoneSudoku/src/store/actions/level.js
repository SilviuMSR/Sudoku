import { SET_DIFFICULTY, RESET_DIFFICULTY, SET_LEVEL_ID, RESET_LEVEL_ID } from './actionTypes';

export const setDifficulty = difficultyLevel => dispatch => {
    dispatch({
        type: SET_DIFFICULTY,
        action: difficultyLevel
    })
    return Promise.resolve()
}

export const resetDifficulty = () => dispatch => {
    dispatch({
        type: RESET_DIFFICULTY
    })
    return Promise.resolve()
}

export const setLevelId = levelId => dispatch => {
    dispatch({
        type: SET_LEVEL_ID,
        action: levelId
    })
    return Promise.resolve()
}

export const resetLevelId = () => dispatch => {
    dispatch({
        type: RESET_LEVEL_ID
    })
    return Promise.resolve()
}
