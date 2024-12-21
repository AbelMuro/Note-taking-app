import React from 'react';
import {useNavigate} from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import {useTheme} from '~/Hooks';
import icons from './icons';
import * as styles from './styles.module.css';

function GoogleLoginButton() {
    const navigate = useNavigate();
    const login = useGoogleLogin({
        onSuccess: async (token) => {
           const response = await fetch('https://note-taking-server.netlify.app/google-login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({token})
           })

           if(response.status === 200){
                const result = await response.text();
                console.log(result);
                navigate('/account');
           }
           else{
            const message = await response.text();
            const event = new CustomEvent('display-message', {'detail' : {message, error: true}});
            document.dispatchEvent(event);
           }
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