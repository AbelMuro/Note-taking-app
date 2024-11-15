import React from 'react';
import Form from './Form';
import icons from '`/icons';
import * as styles from './styles.module.css';

// im finished with tablet, now i need to start with the mobile design

function ForgotPassword() {
    return(
        <section className={styles.forgot}>
            <img className={styles.forgot_icon} src={icons['logo']}/>
            <h1 className={styles.forgot_title}>
                Forgotten your password?
            </h1>
            <p className={styles.forgot_desc}>
                Enter your email below, and we’ll send you a link to reset it.
            </p>
            <Form/>
        </section>
    )
}

export default ForgotPassword;