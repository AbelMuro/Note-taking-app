import themeReducer from './themeReducer.js';
import searchReducer from './searchReducer.js';
import navReducer from './navigationReducer.js';
import pathnameReducer from './pathnameReducer.js';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    theme: themeReducer,
    search: searchReducer,
    nav: navReducer,
    route: pathnameReducer
});

export default rootReducer;