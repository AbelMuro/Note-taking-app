import React from 'react';
import EnterEmail from './EnterEmail';
import * as styles from './styles.module.css';

function Form() {
    return(
        <form className={styles.form}>
            <EnterEmail/>
        </form>
    )
}

export default Form;