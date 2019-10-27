import SQL from 'react-native-sqlite-storage';

import { CREATE_DATABASE, CLOSE_DATABASE } from './actionTypes';


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
        tx.executeSql('DROP TABLE levels')
        tx.executeSql('CREATE TABLE IF NOT EXISTS levels(id INTEGER PRIMARY KEY AUTOINCREMENT, difficulty VARCHAR(20), size INTEGER, done INTEGER, name VARCHAR(20), time VARCHAR(10), level VARCHAR(255))', [], (tx, tableRes) => {

            return resolve({
                created: true
            })
        },
            err => reject(err.message)),
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

export const updateLevel = (levelId, difficulty) => (dispatch, getState) => new Promise((resolve, reject) => {
    const { db } = getState().database;
    return db.transaction(tx => {
        tx.executeSql("UPDATE levels SET done=? WHERE id=? AND difficulty=?", [1, levelId, difficulty], (tx, res) => {
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

