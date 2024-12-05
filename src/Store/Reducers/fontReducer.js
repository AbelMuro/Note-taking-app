import { createAction, createReducer } from '@reduxjs/toolkit'
            
const preferredFont = localStorage.getItem('users-preferred-font');
const updateFont = createAction('UPDATE_FONT');
const initialState = { font: preferredFont || 'sans-serif'}

const fontReducer = createReducer(initialState, (builder) => {  
  builder
    .addCase(updateFont, (state, action) => {                        
      state.font = action.payload;
    })
})

export default fontReducer;