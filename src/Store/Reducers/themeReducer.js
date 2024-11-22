import { createAction, createReducer } from '@reduxjs/toolkit'
            
const changeTheme = createAction('CHANGE_THEME')
const initialState = { theme: 'light' }

const counterReducer = createReducer(initialState, (builder) => {       //builder, as the name implies, is an object that builds the reducer with .addCase
  builder
    .addCase(changeTheme, (state, action) => {                        
      state.theme = action.payload;
    })
})

export default counterReducer;