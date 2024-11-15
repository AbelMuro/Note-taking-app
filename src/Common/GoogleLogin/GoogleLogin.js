import React from 'react';
import icons from './icons';
import * as styles from './styles.module.css';

function GoogleLogin() {
    return(
        <section className={styles.container}>
            <p className={styles.container_title}>
                Or log in with:
            </p>
            <button className={styles.container_button}>
                <img src={icons['google']}/>
                Google
            </button>
        </section>
    )
}

export default GoogleLogin;