import React, {useState, createContext} from 'react';
import Login from './Login';
import SignUp from './SignUp';
import ForgotPassword from './ForgotPassword';

export const AuthContext = createContext();

function Authentication() {
    const [auth, setAuth] = useState('login');

    return(
        <AuthContext.Provider value={{setAuth}}>
            {auth === 'login' && <Login/>}
            {auth === 'sign up' && <SignUp/>}
            {auth === 'forgot' && <ForgotPassword/>}            
        </AuthContext.Provider>
    )

}

export default Authentication;