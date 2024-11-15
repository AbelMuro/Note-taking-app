import React, {useContext} from 'react';
import {AuthContext} from '`/Authentication.js'
import Form from './Form';
import GoogleLogin from '`/GoogleLogin';
import icons from '../icons';
import * as styles from './styles.module.css';

function Login(){
    const {setAuth} = useContext(AuthContext);

    const handleAuth = () => {
        setAuth('sign up');
    }

    return(
        <section className={styles.login}>
            <img className={styles.login_logo} src={icons['logo']}/>
            <h1 className={styles.login_title}>
                Welcome to Note
            </h1>
            <h2 className={styles.login_message}>
                Please log in to continue
            </h2>
            <Form/>
            <GoogleLogin/>
            <p className={styles.login_account}>
                No account yet? <a onClick={handleAuth}>
                    Sign Up
                </a>
            </p>
        </section>
    )
}

export default Login;