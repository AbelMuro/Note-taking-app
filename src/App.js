import React, {useEffect, useLayoutEffect} from 'react';
import { useSelector } from 'react-redux';
import './styles.css';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import ForgotPassword from './Pages/ForgotPassword';
import ResetPassword from './Pages/ResetPassword';
import Account from './Pages/Account';
import DisplayNotes from './Common/Components/DisplayNotes';
import AllNotes from './Pages/Account/Components/AllNotes';
import AllArchivedNotes from './Pages/Account/Components/AllArchivedNotes';
import AllTaggedNotes from './Pages/Account/Components/AllTaggedNotes';
import AllSearchedNotes from './Pages/Account/Components/AllSearchedNotes';
import Settings from './Pages/Settings';
import ColorTheme from './Pages/Settings/Components/ColorTheme';
import FontTheme from './Pages/Settings/Components/FontTheme';
import EditNote from './Pages/Account/Components/EditNote';
import ChangePassword from './Pages/Settings/Components/ChangePassword';
import {BrowserRouter, Routes, Route} from 'react-router-dom';


function App() {
    const theme = useSelector(state => state.theme.theme);

    useLayoutEffect(() => {
        const preferredFont = localStorage.getItem('users-preferred-font');
        const root = document.documentElement;
        root.style.setProperty('--font', preferredFont || 'sans-serif');
    }, [])

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
                        <Route path='/account/' element={<DisplayNotes><AllNotes/></DisplayNotes>}>
                            <Route path='/account/:note' element={<EditNote/>}/>
                        </Route>
                        <Route path='/account/archived-notes' element={<DisplayNotes><AllArchivedNotes/></DisplayNotes>}>
                            <Route path='/account/archived-notes/:archiveNote' element={<EditNote/>}/>
                        </Route>
                        <Route path='/account/tags/:tags' element={<DisplayNotes><AllTaggedNotes/></DisplayNotes>}>
                            <Route path='/account/tags/:tags/:tag' element={<EditNote/>}/>
                        </Route>    
                        <Route path='/account/search' element={<DisplayNotes><AllSearchedNotes/></DisplayNotes>}>
                            <Route path='/account/search/:note' element={<EditNote/>}/>
                        </Route>    
                        <Route path='/account/settings' element={<Settings/>}> 
                            <Route path='/account/settings/' element={<ColorTheme/>}/>
                            <Route path='/account/settings/font' element={<FontTheme/>}/>
                            <Route path='/account/settings/password' element={<ChangePassword/>}/>
                        </Route>                
                    </Route>
                </Routes>
            </BrowserRouter>            

    )
}

export default App;