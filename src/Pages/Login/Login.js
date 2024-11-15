import React from 'react';
import Form from './Form';
import GoogleLogin from '~/Common/GoogleLogin';
import icons from '`/icons';
import * as styles from './styles.module.css';
import {useNavigate} from 'react-router-dom';

function Login(){
    const navigate = useNavigate();

    const handleSignUp = () => {
        navigate('signup')
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
                No account yet? <a onClick={handleSignUp}>
                    Sign Up
                </a>
            </p>
        </section>
    )
}

export default Login;