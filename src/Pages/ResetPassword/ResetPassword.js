import React from 'react';
import Form from './Form';
import icons from '`/icons'
import * as styles from './styles.module.css';

function ResetPassword() {
    return(
        <section className={styles.reset}>
            <img className={styles.reset_logo} src={icons['logo']}/>
            <h1 className={styles.reset_title}>
                Reset Your Password
            </h1>
            <p className={styles.reset_desc}>
                Choose a new password to secure your account.
            </p>
            <Form/>
        </section>
    )
}

export default ResetPassword;