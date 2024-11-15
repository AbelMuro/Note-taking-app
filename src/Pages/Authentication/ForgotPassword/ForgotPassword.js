import React from 'react';
import icons from '`/icons';
import * as styles from './styles.module.css';

function ForgotPassword() {
    return(
        <section className={styles.forgot}>
            <img className={styles.forgot_icon} src={icons['logo']}/>
        </section>
    )
}

export default ForgotPassword;