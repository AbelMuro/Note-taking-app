import React from 'react';
import './styles.css';
import Authenticate from './Pages/Authentication';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Authenticate/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App;