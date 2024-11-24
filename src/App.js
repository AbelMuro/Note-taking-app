import React, {useEffect} from 'react';
import { useSelector } from 'react-redux';
import './styles.css';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import ForgotPassword from './Pages/ForgotPassword';
import ResetPassword from './Pages/ResetPassword';
import Account from './Pages/Account';
import DisplayNotes from './Pages/Account/Components/DisplayNotes';
import EditNote from './Pages/Account/Components/EditNote';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {
    const theme = useSelector(state => state.theme.theme);

    useEffect(() => {
        const body = document.body;
        body.style.backgroundColor = theme === 'light' ? '#F3F5F8' : '#2B303B';
    }, [theme]);


    return(
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Login/>}/>
                    <Route path='/signup' element={<SignUp/>}/>
                    <Route path='/forgot' element={<ForgotPassword/>}/>
                    <Route path='/reset/:token' element={<ResetPassword/>}/>
                    <Route path='/account' element={<Account/>}>
                        <Route path='/account/notes' element={<DisplayNotes/>}>
                            <Route path='/account/notes/' element={<EditNote/>}/>
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>            

    )
}

export default App;