import { createStore } from 'redux';
import reducer from './reducers.js';

// let rootReducer = combineReducers({ data: reducer });

export default createStore(reducer);
