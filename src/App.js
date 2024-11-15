import React from 'react';
import './styles.css';
import Authenticate from './Pages/Authentication';
import {BrowserRouter, Routes, Route} from 'react-router-dom';


//i will need to refactor some code here, the sign up, login and forgot components should be in their own routes
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