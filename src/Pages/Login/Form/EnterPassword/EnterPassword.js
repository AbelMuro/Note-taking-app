import React, {useState} from 'react';
import * as styles from './styles.module.css';
import icons from '`/icons'
import localIcons from  './icons';
import {useNavigate} from 'react-router-dom';

function EnterPassword(){
    const [password, setPassword] = useState('');
    const [displayPassword, setDisplayPassword] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleForgot = () => {
        navigate('/reset');
    }
    
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

        if(isEmpty)
            setError('empty');
    }

    const handleInvalid = (e) => {
        const isEmpty = e.target.validity.valueMissing;
        e.target.setCustomValidity(' ');

        if(isEmpty)
            setError('empty');
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
                    onBlur={handleBlur}
                    onChange={handlePassword}
                    onInvalid={handleInvalid}
                    required
                    />
                {
                displayPassword ? 
                    <img className={styles.eye_icon} src={localIcons['hide']} onClick={handleDisplayPassword}/>
                        :
                    <img className={styles.eye_icon} src={localIcons['show']} onClick={handleDisplayPassword}/>
                }
            </div>
            <a className={styles.forgot_password} onClick={handleForgot}>
                Forgot
            </a>
            {error === 'empty' && 
                <div className={styles.error}>
                    <img className={styles.error_icon} src={icons['error']}/>
                    Can't be empty
                </div>}
        </fieldset>
    )
}

export default EnterPassword;