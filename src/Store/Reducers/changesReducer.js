import { createAction, createReducer } from '@reduxjs/toolkit'
            
const setChanges = createAction('SET_CHANGES');
const initialState = { changesSaved: true}

const changesReducer = createReducer(initialState, (builder) => {  
  builder
    .addCase(setChanges, (state, action) => {                        
      state.changesSaved = action.payload;
    })
})

export default changesReducer;