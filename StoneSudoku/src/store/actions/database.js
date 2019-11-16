import SQL from 'react-native-sqlite-storage';

import { CREATE_DATABASE, CLOSE_DATABASE, SET_USERNAME } from './actionTypes';

export const setConnectedUserName = username => dispatch => new Promise((resolve, reject) => {
    dispatch({
        type: SET_USERNAME,
        payload: username
    })
    return resolve({ set: true })
})

export const openDatabaseConnection = () => dispatch => new Promise((resolve, reject) => {
    let db = SQL.openDatabase({
        name: 'Game'
    }, () => {
        dispatch({
            type: CREATE_DATABASE,
            payload: { db }
        });
        return resolve(db);
    }, reject)
})

export const createDatabaseTable = () => (dispatch, getState) => new Promise((resolve, reject) => {
    const { db } = getState().database;

    return db.transaction(tx => {
        // tx.executeSql('DROP TABLE IF EXISTS levels')
        // tx.executeSql('DROP TABLE IF EXISTS users')
        tx.executeSql('CREATE TABLE IF NOT EXISTS levels(id INTEGER PRIMARY KEY AUTOINCREMENT, difficulty VARCHAR(20), size INTEGER, done INTEGER, name VARCHAR(20), time VARCHAR(10), level VARCHAR(255))', [], (txRes, tableRes) => {
            tx.executeSql('CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(50), phoneId VARCHAR(50))', [], () => {
                return resolve({
                    created: true
                })
            })
        },
            err => reject(err.message)),
            err => reject(err.message)
    })
})

export const createUser = (username, phoneId) => (dispatch, getState) => new Promise((resolve, reject) => {
    const { db } = getState().database;

    return db.transaction(tx => {
        tx.executeSql("INSERT INTO users (name, phoneId) values (?, ?)", [username, phoneId], () => {
            return resolve({ inserted: true })
        })
        err => {
            return reject(err.message)
        }
    })
})

export const checkExistingUser = phoneId => (dispatch, getState) => new Promise((resolve, reject) => {
    const { db } = getState().database;
    return db.transaction(tx => {
        tx.executeSql("SELECT * FROM users WHERE phoneId=?", [phoneId], (tx, res) => {
            return resolve(res.rows)
        })
        err => reject(err.message)
    })
})

export const insertInTable = level => (dispatch, getState) => new Promise((resolve, reject) => {
    const { db } = getState().database;
    return db.transaction(tx => {
        tx.executeSql("INSERT INTO levels (difficulty, size, done, name, time, level) values (?, ?, ?, ?, ?, ?)", [level.difficulty, level.size, level.done, level.name, level.time, level.level])
        err => {
            return reject(err.message)
        }
    })
})

export const getFromTable = () => (dispatch, getState) => new Promise((resolve, reject) => {
    const { db } = getState().database;
    return db.transaction(tx => {
        tx.executeSql("SELECT * FROM levels", [], (tx, res) => {
            return resolve(res.rows)
        })
        err => reject(err.message)
    })
})

export const getFromTableByOptions = (levelId, difficulty) => (dispatch, getState) => new Promise((resolve, reject) => {
    const { db } = getState().database;
    return db.transaction(tx => {
        tx.executeSql("SELECT * FROM levels WHERE id=? AND difficulty=?", [levelId, difficulty], (tx, res) => {
            return resolve(res.rows)
        })
        err => reject(err.message)
    })
})

export const updateLevel = (levelId, difficulty, time) => (dispatch, getState) => new Promise((resolve, reject) => {
    const { db } = getState().database;
    return db.transaction(tx => {
        tx.executeSql("UPDATE levels SET done=?, time=? WHERE id=? AND difficulty=?", [1, time, levelId, difficulty], (tx, res) => {
            return resolve(res.rows)
        })
        err => reject(err.message)
    })
})


export const closeDatabaseConnection = () => (dispatch, getState) => {
    const { db } = getState().database;

    database.close();

    dispatch({
        type: CLOSE_DATABASE
    })
}

