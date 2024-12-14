import { createAction, createReducer } from '@reduxjs/toolkit'
            
const changeTheme = createAction('UPDATE_THEME');
const resetTheme = createAction('RESET_THEME');
const theme = localStorage.getItem('users-preferred-theme');
const initialState = { theme: theme || 'light' }

const counterReducer = createReducer(initialState, (builder) => {       //builder, as the name implies, is an object that builds the reducer with .addCase
  builder
    .addCase(changeTheme, (state, action) => {                        
      state.theme = action.payload;
    })
    .addCase(resetTheme, (state) => {
      state.theme = initialState.theme;
    })
})

export default counterReducer;