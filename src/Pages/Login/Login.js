import React, {memo} from 'react';
import {useTheme} from '~/Hooks';
import {useSelector} from 'react-redux';
import Form from './Form';
import GoogleLogin from '~/Common/GoogleLogin';
import icons from '`/icons';
import * as styles from './styles.module.css';
import {useNavigate} from 'react-router-dom';

function Login(){
    const navigate = useNavigate();
    const [changeClass] = useTheme(styles);
    const theme = useSelector(state => state.theme.theme);

    const handleSignUp = () => {
        navigate('signup');
    }

    return(
        <section className={changeClass('login')}>
            <img className={styles.login_logo} src={theme === 'light' ? icons['logo'] : icons['darkLogo']}/>
            <h1 className={changeClass('login_title')}>
                Welcome to Note
            </h1>
            <h2 className={changeClass('login_message')}>
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

export default memo(Login);