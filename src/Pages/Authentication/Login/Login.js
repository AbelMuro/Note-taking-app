import React from 'react';
import Form from './Form';
import icons from '../icons';
import * as styles from './styles.module.css';

function Login(){
    return(
        <section className={styles.login}>
            <img className={styles.login_logo} src={icons['logo']}/>
            <h1 className={styles.login_title}>
                Welcome to Note
            </h1>
            <h2 className={styles.login_message}>
                Please log in to continue
            </h2>
            <Form/>
        </section>
    )
}

export default Login;