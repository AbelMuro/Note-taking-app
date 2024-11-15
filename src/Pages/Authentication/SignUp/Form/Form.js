import React from 'react';
import EnterEmail from './EnterEmail';
import EnterPassword from './EnterPassword';
import * as styles from './styles.module.css';

function Form() {
    return(
        <form className={styles.form}>
            <EnterEmail/>
            <EnterPassword/>
            <button className={styles.form_submit}>
                Sign Up
            </button>
        </form>
    )
}

export default Form;