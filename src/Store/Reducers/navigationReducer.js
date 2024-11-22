import { createAction, createReducer } from '@reduxjs/toolkit'
            
const updateNav = createAction('UPDATE_NAV');
const initialState = { nav: 'all' }

const navReducer = createReducer(initialState, (builder) => {  
  builder
    .addCase(updateNav, (state, action) => {                        
      state.nav = action.payload;
    })
})

export default navReducer;