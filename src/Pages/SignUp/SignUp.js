import React from 'react';
import {useTheme} from '~/Hooks';
import Form from './Form';
import GoogleLogin from '~/Common/Components/GoogleLogin';
import icons from '`/icons';
import * as styles from './styles.module.css';
import {usePreNavigate} from '~/Hooks';

function SignUp() {
    const [theme, changeClass] = useTheme(styles);
    const navigate = usePreNavigate();


    const handleNavigate = () => {
        navigate('/');
    }

    return(        
        <section className={changeClass('signup')}>
            {theme === 'light' ? 
                <img className={styles.signup_logo} src={icons['logo']}/> : 
                <img className={styles.signup_logo} src={icons['logoDark']}/>
                }
            <h1 className={changeClass('signup_title')}>
                Create Your Account
            </h1>
            <h2 className={changeClass('signup_message')}>
                Sign up to start organizing your notes and boost your productivity.
            </h2>
            <Form/>
            <GoogleLogin/>
            <p className={changeClass('signup_account')}>
                Already have an account? <a onClick={handleNavigate}>
                    Login
                </a>
            </p>
        </section>
    )
}

export default SignUp;