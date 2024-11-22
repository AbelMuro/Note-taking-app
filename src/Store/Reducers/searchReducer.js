import { createAction, createReducer } from '@reduxjs/toolkit'
            
const updateSearch = createAction('UPDATE_SEARCH');
const initialState = { search: '' }

const searchReducer = createReducer(initialState, (builder) => {       //builder, as the name implies, is an object that builds the reducer with .addCase
  builder
    .addCase(updateSearch, (state, action) => {                        
      state.search = action.payload;
    })
})

export default searchReducer;