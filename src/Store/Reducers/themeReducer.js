import { createAction, createReducer } from '@reduxjs/toolkit'
            
const changeTheme = createAction('CHANGE_THEME')
const initialState = { theme: 'dark' }

const counterReducer = createReducer(initialState, (builder) => {       //builder, as the name implies, is an object that builds the reducer with .addCase
  builder
    .addCase(changeTheme, (state, action) => {                        
      state.theme = action.theme;
    })
})

export default counterReducer;