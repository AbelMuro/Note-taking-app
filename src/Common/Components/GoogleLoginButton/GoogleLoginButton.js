import React, {useState} from 'react';
import { ClipLoader } from 'react-spinners';
import {useNavigate} from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import {useTheme} from '~/Hooks';
import {thirdPartyCookiesEnabled, crossSiteTrackingEnabled} from '~/Common/Functions';
import icons from './icons';
import * as styles from './styles.module.css';

function GoogleLoginButton() {
    const [theme, changeClass] = useTheme(styles);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const login = useGoogleLogin({
        onSuccess: async (token) => {
            try{
                const response = await fetch('https://note-taking-server.netlify.app/google-login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({token}),
                    credentials: 'include'
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
            catch(error){
                const message = error.message;
                const event = new CustomEvent('display-message', {'detail' : {message, error: true}})
                document.dispatchEvent(event);
            }
            finally {
                setLoading && setLoading(false);
            }
        },
        onNonOAuthError: () => {
            setLoading(false);
        },
        onError: (error) => {
            setLoading(false);
            const message = error.error_description;
            const event = new CustomEvent('display-message', {'detail': {message, error: true}})
            document.dispatchEvent(event);
        }
    })


    const handleClick = () => {
              
        setLoading(true);
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
                        {
                        loading ? 
                            <ClipLoader size='30px' color={theme === 'light' ? '#0E121B' : 'white'}/> : 
                            <>
                                <img src={theme === 'light' ? icons['google'] : icons['googleDark']}/>
                                Google
                            </>
                        }
                </button>
            </section>
    )
}

export default GoogleLoginButton;