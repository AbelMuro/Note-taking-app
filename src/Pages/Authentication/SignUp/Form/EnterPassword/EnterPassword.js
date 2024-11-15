import React, {useState, useEffect} from 'react';
import * as styles from './styles.module.css';
import icons from  './icons';

function EnterPassword(){
    const [password, setPassword] = useState('');
    const [displayPassword, setDisplayPassword] = useState(false);
    const [error, setError] = useState('');

    const handleDisplayPassword = () => {
        setDisplayPassword(!displayPassword);
    } 

    const handlePassword = (e) => {
        setPassword(e.target.value);
        e.target.setCustomValidity('');
        setError('');
    }

    const handleBlur = (e) => {
        const isEmpty = e.target.validity.valueMissing;
        const isInvalid = e.target.validity.patternMismatch;

        if(isEmpty)
            setError('empty');
        else if(isInvalid)
            setError('invalid');
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
                Password
            </label>
            <div className={styles.input_container}>
                <input 
                    type={displayPassword ? 'text' : 'password'} 
                    name='password'
                    value={password}
                    className={styles.input} 
                    pattern={'.{8,}'}
                    onBlur={handleBlur}
                    onChange={handlePassword}
                    onInvalid={handleInvalid}
                    required
                    />
                {
                displayPassword ? 
                    <img className={styles.eye_icon} src={icons['hide']} onClick={handleDisplayPassword}/>
                        :
                    <img className={styles.eye_icon} src={icons['show']} onClick={handleDisplayPassword}/>
                }
            </div>
            <div className={styles.password_requirement} style={error ? {color: '#FB3748'} : {}}>
                <img style={error ? {backgroundColor: '#FB3748'} : {}}/>
                At least 8 characters
            </div>
        </fieldset>
    )
}

export default EnterPassword;