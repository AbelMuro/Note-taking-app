import React from 'react';
import {useSelector} from 'react-redux';
import {useTheme} from '~/Hooks';
import icons from './icons';
import * as styles from './styles.module.css';

function GoogleLogin() {
    const [theme,changeClass] = useTheme(styles);

    return(
        <section className={changeClass('container')}>
            <p className={changeClass('container_title')}>
                Or log in with:
            </p>
            <button className={changeClass('container_button')}>
                <img src={theme === 'light' ? icons['google'] : icons['googleDark']}/>
                Google
            </button>
        </section>
    )
}

export default GoogleLogin;