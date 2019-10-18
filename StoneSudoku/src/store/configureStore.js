import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'

import exampleReducer from './reducers/example';
import levelReducer from './reducers/level'

const middleware = applyMiddleware(thunk)


const rootReducer = combineReducers({
    example: exampleReducer,
    level: levelReducer
});

const configureStore = () => createStore(rootReducer, compose(middleware));

export default configureStore;