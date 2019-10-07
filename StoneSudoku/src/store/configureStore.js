import { createStore, combineReducers } from 'redux';

import exampleReducer from './reducers/example';

const rootReducer = combineReducers({
    example: exampleReducer
});

const configureStore = () => createStore(rootReducer);

export default configureStore;