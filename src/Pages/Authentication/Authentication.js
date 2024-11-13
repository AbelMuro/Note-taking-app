import React, {useState} from 'react';
import Login from './Login';

function Authentication() {
    const [auth, setAuth] = useState('login');

    return auth === 'login' ? <Login/> : <></>

}

export default Authentication;