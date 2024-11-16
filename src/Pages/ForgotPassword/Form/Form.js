import React from 'react';
import EnterEmail from '~/Common/EnterEmail';
import * as styles from './styles.module.css';
import {useNavigate} from 'react-router-dom';

function Form() {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/reset');
        //...
    }

    return(
        <form className={styles.form} onSubmit={handleSubmit}>
            <EnterEmail/>
            <button className={styles.form_submit}>
                Send Reset Link
            </button>
        </form>
    )
}

export default Form;