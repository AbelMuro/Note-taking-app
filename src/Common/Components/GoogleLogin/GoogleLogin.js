import React, {useEffect} from 'react';
import {useTheme} from '~/Hooks';
import icons from './icons';
import * as styles from './styles.module.css';

function GoogleLoginButton() {
    const [theme, changeClass] = useTheme(styles);


    const handleGoogle = () => {
        
    }

    return(
            <section className={changeClass('container')}>
                <p className={changeClass('container_title')}>
                    Or log in with:
                </p>
                <button className={changeClass('container_button')} onClick={handleGoogle}>
                    <img src={theme === 'light' ? icons['google'] : icons['googleDark']}/>
                    Google
                </button>
            </section>
    )
}

export default GoogleLoginButton;