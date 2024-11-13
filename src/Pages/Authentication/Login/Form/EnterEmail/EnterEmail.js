import React, {useState} from 'react';
import icons from '`/icons';
import * as styles from './styles.module.css';

function EnterEmail() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const handleEmail = (e) => {
        setEmail(e.target.value);
        e.target.setCustomValidity('');
        setError('');
    }

    const handleBlur = (e) => {
        const isEmpty = e.target.validity.valueMissing;
        const isInvalid = e.target.validity.typeMismatch;

        if(isEmpty)
            setError('empty');
        else if(isInvalid)
            setError('invalid')
    }

    const handleInvalid = (e) => {
        const isEmpty = e.target.validity.valueMissing;
        e.target.setCustomValidity(' ');

        if(isEmpty)
            setError('empty');
        else
            setError('invalid')
    }


    return(
        <fieldset className={styles.container}>
            <label className={styles.label}>
                Email Address
            </label>
            <input 
                type='email' 
                name='email'
                value={email}
                placeholder='email@example.com'
                className={styles.input} 
                onBlur={handleBlur}
                onChange={handleEmail}
                onInvalid={handleInvalid}
                required
                />
            {error === 'empty' && 
                <div className={styles.error}>
                    <img className={styles.error_icon} src={icons['error']}/>
                    Can't be empty
                </div>}
            {error === 'invalid' &&
                <div className={styles.error}>
                    <img className={styles.error_icon} src={icons['error']}/>
                        Please enter a valid email address.
                </div>
            }
        </fieldset>
    )
}

export default EnterEmail;