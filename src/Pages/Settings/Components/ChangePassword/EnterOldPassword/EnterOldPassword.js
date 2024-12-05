import React, {useState} from 'react';
import {useTheme} from '~/Hooks';
import * as styles from './styles.module.css';
import icons from '`/icons'

function EnterOldPassword(){
    const [theme, changeClass] = useTheme(styles);
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
            <label className={changeClass('label')}>
                Old Password
            </label>
            <div className={styles.input_container}>
                <input 
                    type={displayPassword ? 'text' : 'password'} 
                    name='old-password'
                    value={password}
                    className={changeClass('input')} 
                    onBlur={handleBlur}
                    onChange={handlePassword}
                    onInvalid={handleInvalid}
                    required
                    />
                {
                displayPassword ? 
                    <img className={styles.eye_icon} src={theme === 'light' ? icons['hide'] : icons['hideDark']} onClick={handleDisplayPassword}/>
                        :
                    <img className={styles.eye_icon} src={theme === 'light' ? icons['show'] : icons['showDark']} onClick={handleDisplayPassword}/>
                }
            </div>
            {error === 'empty' && 
                <div className={styles.error}>
                    <img className={styles.error_icon} src={icons['error']}/>
                    Can't be empty
                </div>}
        </fieldset>
    )
}

export default EnterOldPassword;