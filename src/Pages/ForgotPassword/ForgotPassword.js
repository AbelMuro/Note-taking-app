import React from 'react';
import {useTheme} from '~/Hooks';
import Form from './Form';
import icons from '`/icons';
import * as styles from './styles.module.css';

function ForgotPassword() {
    const [theme, changeClass] = useTheme(styles);

    return(
        <section className={changeClass('forgot')}>
            {
                theme === 'light' ? <img className={styles.forgot_icon} src={icons['logo']}/> : 
                <img className={styles.forgot_icon} src={icons['logoDark']}/>
            }
            <h1 className={changeClass('forgot_title')}>
                Forgotten your password?
            </h1>
            <p className={changeClass('forgot_desc')}>
                Enter your email below, and we’ll send you a link to reset it.
            </p>
            <Form/>
        </section>
    )
}

export default ForgotPassword;