import React, {memo} from 'react';
import {useTheme} from '~/Hooks';
import Form from './Form';
import GoogleLogin from '~/Common/GoogleLogin';
import icons from '`/icons';
import * as styles from './styles.module.css';
import {useNavigate} from 'react-router-dom';

function Login(){
    const navigate = useNavigate();
    const [theme, changeClass] = useTheme(styles);

    const handleSignUp = () => {
        navigate('signup');
    }

    return(
        <section className={changeClass('login')}>
            {theme === 'light' ? 
                <img className={styles.login_logo} src={icons['logo']}/> : 
                <img className={styles.login_logo} src={icons['logoDark']}/>
                }
            <h1 className={changeClass('login_title')}>
                Welcome to Note
            </h1>
            <h2 className={changeClass('login_message')}>
                Please log in to continue
            </h2>
            <Form/>
            <GoogleLogin/>
            <p className={changeClass('login_account')}>
                No account yet? <a onClick={handleSignUp}>
                    Sign Up
                </a>
            </p>
        </section>
    )
}

export default memo(Login);