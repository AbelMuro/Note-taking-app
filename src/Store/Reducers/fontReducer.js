import { createAction, createReducer } from '@reduxjs/toolkit'
            
const updateFont = createAction('UPDATE_FONT');
const initialState = { font: 'sans-serif' }

const fontReducer = createReducer(initialState, (builder) => {  
  builder
    .addCase(updateFont, (state, action) => {                        
      state.font = action.payload;
    })
})

export default fontReducer;