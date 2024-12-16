import themeReducer from './themeReducer.js';
import searchReducer from './searchReducer.js';
import navReducer from './navigationReducer.js';
import changesReducer from './changesReducer.js';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    theme: themeReducer,
    search: searchReducer,
    nav: navReducer,
    changesSaved: changesReducer,
});

export default rootReducer;