import React, {useContext} from 'react';
import {AuthContext} from '`/Authentication.js';
import Form from './Form';
import GoogleLogin from '`/GoogleLogin';
import icons from '`/icons';
import * as styles from './styles.module.css';

function SignUp() {
    const {setAuth} = useContext(AuthContext);

    const handleAuth = () => {
        setAuth('login')
    }

    return(        
        <section className={styles.signup}>
            <img className={styles.signup_logo} src={icons['logo']}/>
            <h1 className={styles.signup_title}>
                Create Your Account
            </h1>
            <h2 className={styles.signup_message}>
                Sign up to start organizing your notes and boost your productivity.
            </h2>
            <Form/>
            <GoogleLogin/>
            <p className={styles.signup_account}>
                Already have an account? <a onClick={handleAuth}>
                    Login
                </a>
            </p>
        </section>
    )
}

export default SignUp;