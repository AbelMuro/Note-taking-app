import React from 'react';
import Form from './Form';
import GoogleLogin from '~/Common/GoogleLogin';
import icons from '`/icons';
import * as styles from './styles.module.css';
import {useNavigate} from 'react-router-dom';

function SignUp() {
    const navigate = useNavigate();


    const handleNavigate = () => {
        navigate('/');
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
                Already have an account? <a onClick={handleNavigate}>
                    Login
                </a>
            </p>
        </section>
    )
}

export default SignUp;