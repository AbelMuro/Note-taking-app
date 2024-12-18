import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import {useTheme} from '~/Hooks';
import icons from './icons';
import * as styles from './styles.module.css';

function GoogleLoginButton() {
    const login = useGoogleLogin({
        onSuccess: async (token) => {
           const response = await fetch('https://note-taking-server-thr9.onrender.com/google-login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(token)
           })
        }
    })
    const [theme, changeClass] = useTheme(styles);

    const handleClick = () => {
        login();
    }

    return(
            <section className={changeClass('container')}>
                <p className={changeClass('container_title')}>
                    Or log in with:
                </p>
                <button 
                    className={changeClass('container_button')} 
                    onClick={handleClick}>
                        <img src={theme === 'light' ? icons['google'] : icons['googleDark']}/>
                        Google
                </button>
            </section>
    )
}

export default GoogleLoginButton;