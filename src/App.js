import React, {useLayoutEffect} from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './styles.css';
import PageNotFound from './Pages/404Page';
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
import Settings from './Pages/Account/Components/Settings';
import ColorTheme from './Pages/Account/Components/Settings/Components/ColorTheme';
import FontTheme from './Pages/Account/Components/Settings/Components/FontTheme';
import EditNote from './Pages/Account/Components/EditNote';
import ChangePassword from './Pages/Account/Components/Settings/Components/ChangePassword';
import DisplayMessage from './Common/Components/DisplayMessage';
import DisplayTags from './Pages/Account/Components/DisplayTags';
import ChangeBackground from './Common/Components/ChangeBackground';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {

    useLayoutEffect(() => {
        const preferredFont = localStorage.getItem('users-preferred-font');
        const root = document.documentElement;
        root.style.setProperty('--font', preferredFont || 'sans-serif');
    }, [])

    return(
        <GoogleOAuthProvider clientId={process.env.CLIENT_ID}> 
            <BrowserRouter>
                <DisplayMessage/>
                <ChangeBackground/>
                <Routes>
                    <Route path='*' element={<PageNotFound/>}/>
                    <Route path='/' element={<Login/>}/>
                    <Route path='/signup' element={<SignUp/>}/>
                    <Route path='/forgot' element={<ForgotPassword/>}/>
                    <Route path='/reset/:token' element={<ResetPassword/>}/>
                    <Route path='/account' element={<Account/>}>
                        <Route path='/account/' element={<DisplayNotes><AllNotes/></DisplayNotes>}>                {/*<DisplayNotes/> has an <Outlet/> that is used to render <EditNote/>*/}
                            <Route path='/account/:note' element={<EditNote/>}/>
                        </Route>
                        <Route path='/account/archived-notes' element={<DisplayNotes><AllArchivedNotes/></DisplayNotes>}>
                            <Route path='/account/archived-notes/:archiveNote' element={<EditNote/>}/>
                        </Route>
                        <Route path='/account/tags' element={<DisplayTags/>}/>
                        <Route path='/account/tags/:tags' element={<DisplayNotes><AllTaggedNotes/></DisplayNotes>}>
                            <Route path='/account/tags/:tags/:tag' element={<EditNote/>}/>
                        </Route>
                        <Route path='/account/search' element={<DisplayNotes><AllSearchedNotes/></DisplayNotes>}>
                            <Route path='/account/search/:note' element={<EditNote/>}/>
                        </Route>    
                        <Route path='/account/settings' element={<Settings/>}> 
                            <Route path='/account/settings/theme' element={<ColorTheme/>}/>
                            <Route path='/account/settings/font' element={<FontTheme/>}/>
                            <Route path='/account/settings/password' element={<ChangePassword/>}/>
                        </Route>                
                    </Route>
                </Routes>
            </BrowserRouter>         
        </GoogleOAuthProvider>
           
    )
}

export default App;