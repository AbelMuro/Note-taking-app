import React, {useEffect} from 'react';
import {useTheme} from '~/Hooks';
import icons from './icons';
import * as styles from './styles.module.css';

function GoogleLoginButton() {
    const [theme, changeClass] = useTheme(styles);

    const handleCredentialResponse = (res) => {
        console.log(res.credential);
    }

    const triggerGoogleSignIn = () => { 
        window.google.accounts.id.prompt((notification) => { 
            if(notification.isNotDisplayed()) 
                console.log(notification.getNotDisplayedReason()); 
            else if(notification.isSkippedMoment()) 
                console.log(notification.getSkippedReason()); 
            else if(notification.isDismissedMoment()) 
                console.log(notification.getDismissedReason())
            }); 
    };


    useEffect(() => {
        console.log(window.google);
        window.google.accounts.id.initialize({ 
            client_id: process.env.CLIENT_ID, 
            callback: handleCredentialResponse, 
        });
    }, [])

    return(
            <section className={changeClass('container')}>
                <p className={changeClass('container_title')}>
                    Or log in with:
                </p>
                <button className={changeClass('container_button')} onClick={triggerGoogleSignIn}>
                    <img src={theme === 'light' ? icons['google'] : icons['googleDark']}/>
                    Google
                </button>
            </section>
    )
}

export default GoogleLoginButton;