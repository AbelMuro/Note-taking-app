import themeReducer from './themeReducer.js';
import searchReducer from './searchReducer.js';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    theme: themeReducer,
    search: searchReducer,
});

export default rootReducer;