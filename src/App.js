import React from 'react';
import './styles.css';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import ForgotPassword from './Pages/ForgotPassword';
import ResetPassword from './Pages/ResetPassword';
import Account from './Pages/Account';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login/>}/>
                <Route path='/signup' element={<SignUp/>}/>
                <Route path='/forgot' element={<ForgotPassword/>}/>
                <Route path='/reset/:token' element={<ResetPassword/>}/>
                <Route path='/account' element={<Account/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App;