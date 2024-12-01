import { createAction, createReducer } from '@reduxjs/toolkit'
            
const updatePathname = createAction('UPDATE_PATHNAME');
const updateParams = createAction('UPDATE_PARAMS');
const initialState = { pathname: '' , params: {note: false, tagName: false, tagNote: false}}

const pathnameReducer = createReducer(initialState, (builder) => {       //builder, as the name implies, is an object that builds the reducer with .addCase
  builder
    .addCase(updatePathname, (state, action) => {                        
      state.pathname = action.payload;
    })
    .addCase(updateParams, (state, action) => {
      state.params = action.payload;
    })
})

export default pathnameReducer;