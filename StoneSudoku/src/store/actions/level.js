import { SET_DIFFICULTY, RESET_DIFFICULTY, SET_LEVEL_ID, RESET_LEVEL_ID, SET_LEVEL_MODE, RESET_LEVEL_MODE } from './actionTypes';

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

export const setGameMode = mode => dispatch => {
    dispatch({
        type: SET_LEVEL_MODE,
        payload: mode
    })
    return Promise.resolve()
}

export const resetGameMode = () => dispatch => {
    dispatch({
        type: RESET_LEVEL_MODE
    })
    return Promise.resolve()
}